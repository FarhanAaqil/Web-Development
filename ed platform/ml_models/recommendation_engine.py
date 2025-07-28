import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
from sklearn.cluster import KMeans
import json
import sys

class PersonalizedRecommendationEngine:
    def __init__(self):
        self.tfidf = TfidfVectorizer(max_features=1000, stop_words='english')
        self.svd = TruncatedSVD(n_components=50)
        self.kmeans = KMeans(n_clusters=5, random_state=42)
        self.user_profiles = {}
        self.course_features = {}
        
    def load_datasets(self):
        """Load custom educational datasets"""
        # Sample course dataset
        courses_data = {
            'course_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            'title': [
                'Advanced JavaScript Concepts',
                'Python for Data Science',
                'React.js Complete Guide',
                'Machine Learning Basics',
                'Web Development Bootcamp',
                'Database Design Fundamentals',
                'UI/UX Design Principles',
                'Node.js Backend Development',
                'Mobile App Development',
                'Cybersecurity Essentials'
            ],
            'category': ['Programming', 'Data Science', 'Frontend', 'AI/ML', 'Web Dev', 
                        'Database', 'Design', 'Backend', 'Mobile', 'Security'],
            'level': ['Advanced', 'Intermediate', 'Beginner', 'Advanced', 'Beginner',
                     'Intermediate', 'Beginner', 'Intermediate', 'Intermediate', 'Advanced'],
            'skills': [
                'JavaScript ES6 Closures Async Programming',
                'Python Pandas NumPy Machine Learning',
                'React Hooks Components State Management',
                'Machine Learning Algorithms TensorFlow',
                'HTML CSS JavaScript Responsive Design',
                'SQL Database Design Normalization',
                'Design Thinking Figma Prototyping',
                'Node.js Express MongoDB REST APIs',
                'React Native Flutter Mobile UI',
                'Security Encryption Network Protection'
            ],
            'difficulty_score': [8, 7, 5, 9, 3, 6, 4, 7, 6, 8],
            'duration_hours': [12, 16, 10, 20, 25, 8, 14, 15, 18, 12]
        }
        
        # Sample user interaction dataset
        user_interactions = {
            'user_id': [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5],
            'course_id': [1, 2, 5, 1, 3, 2, 4, 6, 3, 5, 1, 7],
            'rating': [5, 4, 3, 4, 5, 5, 3, 4, 4, 5, 3, 4],
            'completion_rate': [0.9, 0.8, 0.6, 0.7, 1.0, 0.95, 0.5, 0.8, 0.85, 0.9, 0.4, 0.7],
            'time_spent': [10, 14, 8, 9, 10, 15, 12, 6, 8, 22, 5, 10]
        }
        
        self.courses_df = pd.DataFrame(courses_data)
        self.interactions_df = pd.DataFrame(user_interactions)
        
        return self.courses_df, self.interactions_df
    
    def build_user_profile(self, user_id, interactions_df):
        """Build user learning profile based on interactions"""
        user_data = interactions_df[interactions_df['user_id'] == user_id]
        
        if user_data.empty:
            return {
                'preferred_categories': [],
                'skill_level': 'beginner',
                'learning_pace': 'normal',
                'interests': []
            }
        
        # Calculate preferences
        avg_rating = user_data['rating'].mean()
        avg_completion = user_data['completion_rate'].mean()
        avg_time = user_data['time_spent'].mean()
        
        # Determine learning pace
        if avg_time > 15:
            pace = 'slow'
        elif avg_time < 8:
            pace = 'fast'
        else:
            pace = 'normal'
        
        # Determine skill level based on course difficulty
        course_difficulties = []
        for course_id in user_data['course_id']:
            difficulty = self.courses_df[self.courses_df['course_id'] == course_id]['difficulty_score'].iloc[0]
            course_difficulties.append(difficulty)
        
        avg_difficulty = np.mean(course_difficulties)
        if avg_difficulty >= 7:
            skill_level = 'advanced'
        elif avg_difficulty >= 5:
            skill_level = 'intermediate'
        else:
            skill_level = 'beginner'
        
        return {
            'avg_rating': avg_rating,
            'avg_completion': avg_completion,
            'learning_pace': pace,
            'skill_level': skill_level,
            'preferred_difficulty': avg_difficulty
        }
    
    def content_based_recommendations(self, user_id, num_recommendations=5):
        """Generate content-based recommendations"""
        courses_df, interactions_df = self.load_datasets()
        user_profile = self.build_user_profile(user_id, interactions_df)
        
        # Get courses user has already taken
        user_courses = interactions_df[interactions_df['user_id'] == user_id]['course_id'].tolist()
        
        # Filter out already taken courses
        available_courses = courses_df[~courses_df['course_id'].isin(user_courses)]
        
        if available_courses.empty:
            return []
        
        # Create TF-IDF matrix for course skills
        tfidf_matrix = self.tfidf.fit_transform(available_courses['skills'])
        
        # Calculate similarity scores based on user profile
        recommendations = []
        
        for idx, course in available_courses.iterrows():
            score = 0
            
            # Skill level matching
            if user_profile['skill_level'] == 'beginner' and course['difficulty_score'] <= 5:
                score += 0.3
            elif user_profile['skill_level'] == 'intermediate' and 4 <= course['difficulty_score'] <= 7:
                score += 0.3
            elif user_profile['skill_level'] == 'advanced' and course['difficulty_score'] >= 6:
                score += 0.3
            
            # Learning pace matching
            if user_profile['learning_pace'] == 'fast' and course['duration_hours'] <= 12:
                score += 0.2
            elif user_profile['learning_pace'] == 'normal' and 10 <= course['duration_hours'] <= 18:
                score += 0.2
            elif user_profile['learning_pace'] == 'slow' and course['duration_hours'] >= 15:
                score += 0.2
            
            # Add some randomness for diversity
            score += np.random.random() * 0.1
            
            recommendations.append({
                'course_id': course['course_id'],
                'title': course['title'],
                'category': course['category'],
                'level': course['level'],
                'score': score,
                'reason': f"Matches your {user_profile['skill_level']} level and {user_profile['learning_pace']} learning pace"
            })
        
        # Sort by score and return top recommendations
        recommendations.sort(key=lambda x: x['score'], reverse=True)
        return recommendations[:num_recommendations]
    
    def collaborative_filtering_recommendations(self, user_id, num_recommendations=5):
        """Generate collaborative filtering recommendations"""
        courses_df, interactions_df = self.load_datasets()
        
        # Create user-item matrix
        user_item_matrix = interactions_df.pivot_table(
            index='user_id', 
            columns='course_id', 
            values='rating', 
            fill_value=0
        )
        
        # Calculate user similarity
        user_similarity = cosine_similarity(user_item_matrix)
        user_similarity_df = pd.DataFrame(
            user_similarity, 
            index=user_item_matrix.index, 
            columns=user_item_matrix.index
        )
        
        if user_id not in user_similarity_df.index:
            return self.content_based_recommendations(user_id, num_recommendations)
        
        # Find similar users
        similar_users = user_similarity_df[user_id].sort_values(ascending=False)[1:4]
        
        # Get courses liked by similar users
        recommendations = []
        user_courses = interactions_df[interactions_df['user_id'] == user_id]['course_id'].tolist()
        
        for similar_user_id, similarity_score in similar_users.items():
            similar_user_courses = interactions_df[
                (interactions_df['user_id'] == similar_user_id) & 
                (interactions_df['rating'] >= 4)
            ]['course_id'].tolist()
            
            for course_id in similar_user_courses:
                if course_id not in user_courses:
                    course_info = courses_df[courses_df['course_id'] == course_id].iloc[0]
                    recommendations.append({
                        'course_id': course_id,
                        'title': course_info['title'],
                        'category': course_info['category'],
                        'level': course_info['level'],
                        'score': similarity_score,
                        'reason': f"Users with similar interests rated this highly"
                    })
        
        # Remove duplicates and sort
        seen_courses = set()
        unique_recommendations = []
        for rec in recommendations:
            if rec['course_id'] not in seen_courses:
                seen_courses.add(rec['course_id'])
                unique_recommendations.append(rec)
        
        unique_recommendations.sort(key=lambda x: x['score'], reverse=True)
        return unique_recommendations[:num_recommendations]
    
    def hybrid_recommendations(self, user_id, num_recommendations=5):
        """Combine content-based and collaborative filtering"""
        content_recs = self.content_based_recommendations(user_id, num_recommendations)
        collab_recs = self.collaborative_filtering_recommendations(user_id, num_recommendations)
        
        # Combine and weight recommendations
        all_recs = {}
        
        # Add content-based recommendations with weight 0.6
        for rec in content_recs:
            course_id = rec['course_id']
            all_recs[course_id] = {
                **rec,
                'score': rec['score'] * 0.6,
                'method': 'content'
            }
        
        # Add collaborative filtering recommendations with weight 0.4
        for rec in collab_recs:
            course_id = rec['course_id']
            if course_id in all_recs:
                all_recs[course_id]['score'] += rec['score'] * 0.4
                all_recs[course_id]['method'] = 'hybrid'
            else:
                all_recs[course_id] = {
                    **rec,
                    'score': rec['score'] * 0.4,
                    'method': 'collaborative'
                }
        
        # Sort and return top recommendations
        final_recs = list(all_recs.values())
        final_recs.sort(key=lambda x: x['score'], reverse=True)
        
        return final_recs[:num_recommendations]

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Please provide user_id"}))
        return
    
    user_id = int(sys.argv[1])
    num_recs = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    
    engine = PersonalizedRecommendationEngine()
    recommendations = engine.hybrid_recommendations(user_id, num_recs)
    
    print(json.dumps(recommendations, indent=2))

if __name__ == "__main__":
    main()
