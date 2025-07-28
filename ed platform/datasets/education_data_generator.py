import pandas as pd
import numpy as np
import json
from datetime import datetime, timedelta
import random

class EducationDatasetGenerator:
    def __init__(self):
        self.subjects = [
            'Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Biology',
            'English Literature', 'History', 'Psychology', 'Economics', 'Art'
        ]
        
        self.programming_languages = [
            'Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js', 'HTML/CSS'
        ]
        
        self.skill_levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
        
    def generate_student_dataset(self, num_students=1000):
        """Generate comprehensive student dataset"""
        np.random.seed(42)
        
        students = []
        for i in range(num_students):
            student = {
                'student_id': f'STU_{i+1:04d}',
                'name': f'Student {i+1}',
                'email': f'student{i+1}@eduai.com',
                'age': np.random.randint(18, 45),
                'gender': np.random.choice(['Male', 'Female', 'Other'], p=[0.45, 0.45, 0.1]),
                'location': np.random.choice([
                    'New York', 'California', 'Texas', 'Florida', 'Illinois',
                    'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'
                ]),
                'education_level': np.random.choice([
                    'High School', 'Bachelor\'s', 'Master\'s', 'PhD'
                ], p=[0.3, 0.4, 0.25, 0.05]),
                'employment_status': np.random.choice([
                    'Student', 'Employed', 'Unemployed', 'Self-employed'
                ], p=[0.4, 0.45, 0.1, 0.05]),
                'learning_style': np.random.choice([
                    'Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing'
                ]),
                'motivation_level': np.random.randint(1, 11),
                'tech_proficiency': np.random.choice(self.skill_levels),
                'preferred_study_time': np.random.choice([
                    'Morning', 'Afternoon', 'Evening', 'Night'
                ]),
                'device_preference': np.random.choice([
                    'Desktop', 'Laptop', 'Tablet', 'Mobile'
                ], p=[0.2, 0.5, 0.2, 0.1]),
                'internet_speed': np.random.choice([
                    'Slow', 'Medium', 'Fast', 'Very Fast'
                ], p=[0.1, 0.3, 0.4, 0.2]),
                'registration_date': (
                    datetime.now() - timedelta(days=np.random.randint(1, 365))
                ).strftime('%Y-%m-%d'),
                'last_login': (
                    datetime.now() - timedelta(days=np.random.randint(0, 30))
                ).strftime('%Y-%m-%d'),
                'total_courses_enrolled': np.random.randint(1, 15),
                'courses_completed': 0,  # Will be calculated
                'total_study_hours': np.random.randint(10, 500),
                'average_session_duration': np.random.randint(15, 180),  # minutes
                'forum_posts': np.random.randint(0, 50),
                'help_requests': np.random.randint(0, 20),
                'peer_interactions': np.random.randint(0, 100),
                'certificates_earned': np.random.randint(0, 10),
                'current_streak': np.random.randint(0, 100),
                'longest_streak': np.random.randint(0, 200),
                'xp_points': np.random.randint(0, 10000),
                'level': np.random.randint(1, 50),
                'badges': np.random.randint(0, 25),
                'preferred_subjects': random.sample(self.subjects, np.random.randint(1, 4)),
                'programming_languages_known': random.sample(
                    self.programming_languages, np.random.randint(0, 4)
                ),
                'career_goals': np.random.choice([
                    'Software Developer', 'Data Scientist', 'Web Designer',
                    'Product Manager', 'Teacher', 'Researcher', 'Entrepreneur'
                ]),
                'satisfaction_score': np.random.randint(1, 11),
                'recommendation_score': np.random.randint(1, 11)
            }
            
            # Calculate completed courses based on enrollment
            student['courses_completed'] = min(
                student['total_courses_enrolled'],
                np.random.randint(0, student['total_courses_enrolled'] + 1)
            )
            
            students.append(student)
        
        return pd.DataFrame(students)
    
    def generate_course_dataset(self, num_courses=200):
        """Generate comprehensive course dataset"""
        np.random.seed(42)
        
        course_titles = [
            'Introduction to Python Programming',
            'Advanced JavaScript Concepts',
            'Data Science with R',
            'Machine Learning Fundamentals',
            'Web Development Bootcamp',
            'Mobile App Development',
            'Database Design and Management',
            'Cybersecurity Essentials',
            'Digital Marketing Strategy',
            'UI/UX Design Principles',
            'Cloud Computing with AWS',
            'Artificial Intelligence Basics',
            'Blockchain Technology',
            'DevOps and CI/CD',
            'React.js Complete Guide',
            'Node.js Backend Development',
            'Data Visualization with D3.js',
            'Statistics for Data Science',
            'Linear Algebra for ML',
            'Computer Vision Fundamentals'
        ]
        
        instructors = [
            'Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Emily Rodriguez',
            'James Wilson', 'Lisa Park', 'David Kim', 'Maria Garcia',
            'Robert Taylor', 'Jennifer Lee', 'Alex Thompson'
        ]
        
        categories = [
            'Programming', 'Data Science', 'Web Development', 'Mobile Development',
            'Machine Learning', 'Cybersecurity', 'Design', 'Business', 'Mathematics'
        ]
        
        courses = []
        for i in range(num_courses):
            base_title = np.random.choice(course_titles)
            course = {
                'course_id': f'CRS_{i+1:04d}',
                'title': f'{base_title} - Level {np.random.randint(1, 4)}',
                'description': f'Comprehensive course covering {base_title.lower()} concepts and practical applications.',
                'instructor': np.random.choice(instructors),
                'category': np.random.choice(categories),
                'subcategory': f'{np.random.choice(categories)} Specialization',
                'level': np.random.choice(self.skill_levels),
                'duration_weeks': np.random.randint(4, 16),
                'duration_hours': np.random.randint(10, 80),
                'price': np.random.choice([0, 29, 49, 79, 99, 149, 199]),
                'currency': 'USD',
                'language': np.random.choice(['English', 'Spanish', 'French'], p=[0.8, 0.15, 0.05]),
                'rating': round(np.random.uniform(3.5, 5.0), 1),
                'num_ratings': np.random.randint(10, 1000),
                'num_students': np.random.randint(50, 5000),
                'completion_rate': round(np.random.uniform(0.6, 0.95), 2),
                'difficulty_score': np.random.randint(1, 10),
                'prerequisites': random.sample(course_titles, np.random.randint(0, 3)),
                'learning_outcomes': [
                    f'Understand {base_title.lower()} fundamentals',
                    f'Apply {base_title.lower()} in real projects',
                    f'Master advanced {base_title.lower()} techniques'
                ],
                'skills_taught': random.sample(self.programming_languages + self.subjects, np.random.randint(2, 6)),
                'certificate_available': np.random.choice([True, False], p=[0.8, 0.2]),
                'hands_on_projects': np.random.randint(1, 8),
                'quizzes': np.random.randint(5, 20),
                'assignments': np.random.randint(3, 15),
                'video_hours': np.random.randint(5, 40),
                'reading_materials': np.random.randint(10, 50),
                'forum_discussions': np.random.randint(0, 100),
                'created_date': (
                    datetime.now() - timedelta(days=np.random.randint(30, 730))
                ).strftime('%Y-%m-%d'),
                'last_updated': (
                    datetime.now() - timedelta(days=np.random.randint(1, 90))
                ).strftime('%Y-%m-%d'),
                'enrollment_status': np.random.choice(['Open', 'Closed', 'Waitlist'], p=[0.7, 0.2, 0.1]),
                'tags': random.sample([
                    'beginner-friendly', 'hands-on', 'project-based', 'certification',
                    'popular', 'trending', 'updated-2024', 'industry-relevant'
                ], np.random.randint(2, 5))
            }
            courses.append(course)
        
        return pd.DataFrame(courses)
    
    def generate_interaction_dataset(self, students_df, courses_df, num_interactions=5000):
        """Generate student-course interaction dataset"""
        np.random.seed(42)
        
        interactions = []
        for i in range(num_interactions):
            student_id = np.random.choice(students_df['student_id'])
            course_id = np.random.choice(courses_df['course_id'])
            
            interaction = {
                'interaction_id': f'INT_{i+1:06d}',
                'student_id': student_id,
                'course_id': course_id,
                'enrollment_date': (
                    datetime.now() - timedelta(days=np.random.randint(1, 365))
                ).strftime('%Y-%m-%d'),
                'completion_date': None,
                'progress_percentage': np.random.randint(0, 101),
                'time_spent_hours': np.random.randint(1, 100),
                'lessons_completed': np.random.randint(0, 50),
                'quizzes_attempted': np.random.randint(0, 20),
                'quiz_average_score': np.random.randint(60, 100),
                'assignments_submitted': np.random.randint(0, 15),
                'assignment_average_score': np.random.randint(70, 100),
                'forum_posts': np.random.randint(0, 20),
                'help_requests': np.random.randint(0, 10),
                'peer_interactions': np.random.randint(0, 30),
                'video_watch_time': np.random.randint(0, 2400),  # minutes
                'reading_time': np.random.randint(0, 1200),  # minutes
                'last_activity_date': (
                    datetime.now() - timedelta(days=np.random.randint(0, 30))
                ).strftime('%Y-%m-%d'),
                'device_used': np.random.choice(['Desktop', 'Laptop', 'Tablet', 'Mobile']),
                'session_count': np.random.randint(1, 100),
                'average_session_duration': np.random.randint(15, 180),  # minutes
                'dropout_risk': np.random.choice([0, 1], p=[0.8, 0.2]),
                'satisfaction_rating': np.random.randint(1, 6),
                'would_recommend': np.random.choice([0, 1], p=[0.2, 0.8]),
                'certificate_earned': np.random.choice([0, 1], p=[0.7, 0.3]),
                'final_grade': np.random.choice(['A', 'B', 'C', 'D', 'F'], p=[0.3, 0.3, 0.2, 0.15, 0.05])
            }
            
            # Set completion date if progress is 100%
            if interaction['progress_percentage'] == 100:
                enrollment_date = datetime.strptime(interaction['enrollment_date'], '%Y-%m-%d')
                completion_date = enrollment_date + timedelta(days=np.random.randint(30, 120))
                interaction['completion_date'] = completion_date.strftime('%Y-%m-%d')
            
            interactions.append(interaction)
        
        return pd.DataFrame(interactions)
    
    def generate_quiz_dataset(self, courses_df, num_quizzes=500):
        """Generate quiz and assessment dataset"""
        np.random.seed(42)
        
        question_types = ['multiple_choice', 'true_false', 'short_answer', 'essay', 'coding']
        difficulty_levels = ['Easy', 'Medium', 'Hard']
        
        quizzes = []
        for i in range(num_quizzes):
            course_id = np.random.choice(courses_df['course_id'])
            
            quiz = {
                'quiz_id': f'QUZ_{i+1:04d}',
                'course_id': course_id,
                'title': f'Quiz {np.random.randint(1, 20)} - {np.random.choice(["Fundamentals", "Advanced", "Practice", "Final"])}',
                'description': 'Assessment to test understanding of course concepts',
                'question_count': np.random.randint(5, 30),
                'time_limit_minutes': np.random.randint(15, 120),
                'max_attempts': np.random.randint(1, 5),
                'passing_score': np.random.randint(60, 80),
                'difficulty_level': np.random.choice(difficulty_levels),
                'question_types': random.sample(question_types, np.random.randint(1, 4)),
                'topics_covered': random.sample(self.subjects, np.random.randint(1, 3)),
                'created_date': (
                    datetime.now() - timedelta(days=np.random.randint(30, 365))
                ).strftime('%Y-%m-%d'),
                'is_active': np.random.choice([True, False], p=[0.9, 0.1]),
                'auto_graded': np.random.choice([True, False], p=[0.8, 0.2]),
                'randomize_questions': np.random.choice([True, False], p=[0.6, 0.4]),
                'show_correct_answers': np.random.choice([True, False], p=[0.7, 0.3]),
                'average_score': np.random.randint(65, 95),
                'completion_rate': round(np.random.uniform(0.7, 0.98), 2),
                'average_time_taken': np.random.randint(20, 90)  # minutes
            }
            quizzes.append(quiz)
        
        return pd.DataFrame(quizzes)
    
    def save_datasets(self, output_dir='datasets'):
        """Generate and save all datasets"""
        import os
        os.makedirs(output_dir, exist_ok=True)
        
        # Generate datasets
        students_df = self.generate_student_dataset(1000)
        courses_df = self.generate_course_dataset(200)
        interactions_df = self.generate_interaction_dataset(students_df, courses_df, 5000)
        quizzes_df = self.generate_quiz_dataset(courses_df, 500)
        
        # Save as CSV
        students_df.to_csv(f'{output_dir}/students.csv', index=False)
        courses_df.to_csv(f'{output_dir}/courses.csv', index=False)
        interactions_df.to_csv(f'{output_dir}/interactions.csv', index=False)
        quizzes_df.to_csv(f'{output_dir}/quizzes.csv', index=False)
        
        # Save as JSON
        students_df.to_json(f'{output_dir}/students.json', orient='records', indent=2)
        courses_df.to_json(f'{output_dir}/courses.json', orient='records', indent=2)
        interactions_df.to_json(f'{output_dir}/interactions.json', orient='records', indent=2)
        quizzes_df.to_json(f'{output_dir}/quizzes.json', orient='records', indent=2)
        
        # Generate summary statistics
        summary = {
            'dataset_info': {
                'students_count': len(students_df),
                'courses_count': len(courses_df),
                'interactions_count': len(interactions_df),
                'quizzes_count': len(quizzes_df),
                'generated_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            },
            'student_demographics': {
                'age_distribution': students_df['age'].describe().to_dict(),
                'education_levels': students_df['education_level'].value_counts().to_dict(),
                'locations': students_df['location'].value_counts().to_dict(),
                'learning_styles': students_df['learning_style'].value_counts().to_dict()
            },
            'course_statistics': {
                'categories': courses_df['category'].value_counts().to_dict(),
                'difficulty_levels': courses_df['level'].value_counts().to_dict(),
                'price_distribution': courses_df['price'].describe().to_dict(),
                'rating_distribution': courses_df['rating'].describe().to_dict()
            },
            'interaction_metrics': {
                'completion_rate': interactions_df['progress_percentage'].mean(),
                'average_time_spent': interactions_df['time_spent_hours'].mean(),
                'quiz_performance': interactions_df['quiz_average_score'].mean(),
                'dropout_rate': interactions_df['dropout_risk'].mean()
            }
        }
        
        with open(f'{output_dir}/dataset_summary.json', 'w') as f:
            json.dump(summary, f, indent=2)
        
        print(f"Datasets generated and saved to {output_dir}/")
        print(f"Summary: {len(students_df)} students, {len(courses_df)} courses, {len(interactions_df)} interactions, {len(quizzes_df)} quizzes")
        
        return {
            'students': students_df,
            'courses': courses_df,
            'interactions': interactions_df,
            'quizzes': quizzes_df,
            'summary': summary
        }

if __name__ == "__main__":
    generator = EducationDatasetGenerator()
    datasets = generator.save_datasets()
