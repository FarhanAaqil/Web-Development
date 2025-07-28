import sys
import json
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import pickle
import os
import re
from datetime import datetime

class EducationalChatbot:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
        self.classifier = MultinomialNB()
        self.responses_db = self.load_responses_database()
        self.context_memory = {}
        
    def load_responses_database(self):
        """Load educational responses database"""
        return {
            'greeting': [
                "Hello! I'm your AI learning assistant. How can I help you today?",
                "Hi there! Ready to learn something new? What subject interests you?",
                "Welcome! I'm here to help with your studies. What would you like to explore?"
            ],
            'programming': [
                "Programming is about solving problems step by step. What programming concept would you like to understand?",
                "Great choice! Programming builds logical thinking. Which language are you interested in?",
                "Let's code! What specific programming topic can I help you with?"
            ],
            'mathematics': [
                "Math is the language of the universe! What mathematical concept are you working on?",
                "Mathematics builds problem-solving skills. Which area of math interests you?",
                "Let's solve some problems! What math topic would you like to explore?"
            ],
            'science': [
                "Science helps us understand the world around us. What scientific topic interests you?",
                "Excellent! Science is all about discovery. Which field would you like to explore?",
                "Let's investigate! What science concept can I help explain?"
            ],
            'study_tips': [
                "Here are some effective study techniques: 1) Active recall 2) Spaced repetition 3) Practice testing",
                "Try the Pomodoro technique: 25 minutes focused study, 5 minute break. It's very effective!",
                "Create mind maps to visualize connections between concepts. This helps with retention!"
            ],
            'motivation': [
                "Remember, every expert was once a beginner. Keep practicing and you'll improve!",
                "Learning is a journey, not a destination. Celebrate small wins along the way!",
                "Challenges are opportunities to grow. You've got this!"
            ],
            'career': [
                "Your skills are building blocks for your future career. What field interests you most?",
                "Consider your passions and strengths when choosing a career path. What excites you?",
                "The job market values continuous learners. What skills would you like to develop?"
            ],
            'help': [
                "I can help with: study tips, subject explanations, career guidance, motivation, and learning strategies.",
                "Ask me about any academic topic, study techniques, or career advice. I'm here to help!",
                "I'm trained on educational content to assist with your learning journey. What do you need help with?"
            ]
        }
    
    def preprocess_text(self, text):
        """Clean and preprocess text"""
        text = text.lower()
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
        return text.strip()
    
    def classify_intent(self, message):
        """Classify user intent using keyword matching and ML"""
        message_clean = self.preprocess_text(message)
        
        # Keyword-based classification
        keywords = {
            'greeting': ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'start'],
            'programming': ['code', 'programming', 'python', 'javascript', 'html', 'css', 'algorithm', 'function'],
            'mathematics': ['math', 'mathematics', 'algebra', 'calculus', 'geometry', 'statistics', 'equation'],
            'science': ['science', 'physics', 'chemistry', 'biology', 'experiment', 'theory'],
            'study_tips': ['study', 'learn', 'tips', 'technique', 'method', 'how to study', 'memory'],
            'motivation': ['motivation', 'encourage', 'difficult', 'hard', 'give up', 'frustrated'],
            'career': ['career', 'job', 'future', 'profession', 'work', 'employment'],
            'help': ['help', 'assist', 'support', 'what can you do', 'capabilities']
        }
        
        for intent, words in keywords.items():
            if any(word in message_clean for word in words):
                return intent
        
        return 'general'
    
    def get_contextual_response(self, message, context, intent):
        """Generate contextual response based on intent and context"""
        if intent in self.responses_db:
            base_responses = self.responses_db[intent]
            response = np.random.choice(base_responses)
        else:
            response = "I understand you're asking about that topic. Could you be more specific so I can help better?"
        
        # Add context-specific information
        if context == 'course':
            response += " Since you're in a course, I can provide more detailed explanations if needed."
        elif context == 'quiz':
            response += " If you're preparing for a quiz, I can help you practice with similar questions."
        
        return response
    
    def generate_educational_content(self, topic):
        """Generate educational content for specific topics"""
        content_db = {
            'javascript': {
                'definition': "JavaScript is a programming language that enables interactive web pages.",
                'example': "Example: let greeting = 'Hello World'; console.log(greeting);",
                'tips': "Practice with small projects and use console.log() to debug your code."
            },
            'python': {
                'definition': "Python is a versatile programming language known for its simplicity.",
                'example': "Example: print('Hello World')",
                'tips': "Start with basic syntax and gradually move to more complex concepts."
            },
            'algebra': {
                'definition': "Algebra uses symbols and letters to represent numbers in equations.",
                'example': "Example: If x + 5 = 10, then x = 5",
                'tips': "Practice solving equations step by step and check your answers."
            }
        }
        
        if topic.lower() in content_db:
            content = content_db[topic.lower()]
            return f"{content['definition']} {content['example']} Tip: {content['tips']}"
        
        return f"I'd be happy to help you learn about {topic}. Could you ask a more specific question?"
    
    def process_message(self, message, context='general'):
        """Main method to process user message and generate response"""
        try:
            # Classify intent
            intent = self.classify_intent(message)
            
            # Check if user is asking about specific topic
            message_lower = message.lower()
            educational_topics = ['javascript', 'python', 'algebra', 'calculus', 'physics', 'chemistry']
            
            for topic in educational_topics:
                if topic in message_lower:
                    return self.generate_educational_content(topic)
            
            # Generate contextual response
            response = self.get_contextual_response(message, context, intent)
            
            # Add learning suggestions
            if intent in ['programming', 'mathematics', 'science']:
                response += f"\n\nWould you like me to suggest some practice exercises for {intent}?"
            
            return response
            
        except Exception as e:
            return "I'm having trouble processing that. Could you rephrase your question?"

def main():
    if len(sys.argv) < 2:
        print("Please provide a message")
        return
    
    message = sys.argv[1]
    context = sys.argv[2] if len(sys.argv) > 2 else 'general'
    
    chatbot = EducationalChatbot()
    response = chatbot.process_message(message, context)
    
    print(response)

if __name__ == "__main__":
    main()
