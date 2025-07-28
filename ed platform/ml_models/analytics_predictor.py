import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_squared_error, accuracy_score
import json
import sys
from datetime import datetime, timedelta

class LearningAnalyticsPredictor:
    def __init__(self):
        self.performance_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.dropout_model = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.label_encoders = {}
        
    def generate_synthetic_dataset(self):
        """Generate synthetic learning analytics dataset"""
        np.random.seed(42)
        n_students = 1000
        
        # Student features
        data = {
            'student_id': range(1, n_students + 1),
            'age': np.random.randint(18, 35, n_students),
            'previous_education': np.random.choice(['high_school', 'bachelor', 'master'], n_students),
            'study_hours_per_week': np.random.normal(15, 5, n_students).clip(5, 40),
            'courses_enrolled': np.random.randint(1, 8, n_students),
            'login_frequency': np.random.normal(4, 1.5, n_students).clip(1, 7),  # days per week
            'assignment_submission_rate': np.random.beta(2, 1, n_students),  # 0-1
            'forum_participation': np.random.poisson(3, n_students),  # posts per week
            'video_completion_rate': np.random.beta(3, 1, n_students),  # 0-1
            'quiz_attempts': np.random.poisson(2, n_students),  # per week
            'help_seeking_behavior': np.random.randint(0, 10, n_students),  # times per week
            'peer_interaction_score': np.random.normal(5, 2, n_students).clip(0, 10),
            'mobile_usage_ratio': np.random.beta(2, 3, n_students),  # 0-1
            'weekend_activity': np.random.beta(1, 2, n_students),  # 0-1
            'procrastination_score': np.random.normal(5, 2, n_students).clip(1, 10)
        }
        
        df = pd.DataFrame(data)
        
        # Generate target variables based on features
        # Performance score (0-100)
        performance_base = (
            df['study_hours_per_week'] * 2 +
            df['assignment_submission_rate'] * 30 +
            df['video_completion_rate'] * 25 +
            df['login_frequency'] * 3 +
            df['forum_participation'] * 2 -
            df['procrastination_score'] * 2
        )
        df['performance_score'] = (performance_base + np.random.normal(0, 5, n_students)).clip(0, 100)
        
        # Dropout risk (0 or 1)
        dropout_prob = 1 / (1 + np.exp(-(
            -df['study_hours_per_week'] * 0.1 +
            -df['assignment_submission_rate'] * 3 +
            -df['login_frequency'] * 0.3 +
            df['procrastination_score'] * 0.2 +
            np.random.normal(0, 0.5, n_students)
        )))
        df['dropout_risk'] = (dropout_prob > 0.3).astype(int)
        
        # Time to completion (weeks)
        df['estimated_completion_weeks'] = (
            df['courses_enrolled'] * 4 / 
            (df['study_hours_per_week'] / 10) * 
            (2 - df['assignment_submission_rate'])
        ).clip(4, 52)
        
        return df
    
    def prepare_features(self, df):
        """Prepare features for machine learning"""
        # Encode categorical variables
        categorical_cols = ['previous_education']
        
        for col in categorical_cols:
            if col not in self.label_encoders:
                self.label_encoders[col] = LabelEncoder()
                df[col + '_encoded'] = self.label_encoders[col].fit_transform(df[col])
            else:
                df[col + '_encoded'] = self.label_encoders[col].transform(df[col])
        
        # Select features for modeling
        feature_cols = [
            'age', 'previous_education_encoded', 'study_hours_per_week',
            'courses_enrolled', 'login_frequency', 'assignment_submission_rate',
            'forum_participation', 'video_completion_rate', 'quiz_attempts',
            'help_seeking_behavior', 'peer_interaction_score', 'mobile_usage_ratio',
            'weekend_activity', 'procrastination_score'
        ]
        
        return df[feature_cols]
    
    def train_models(self):
        """Train prediction models"""
        # Generate dataset
        df = self.generate_synthetic_dataset()
        X = self.prepare_features(df)
        
        # Train performance prediction model
        y_performance = df['performance_score']
        X_train, X_test, y_train, y_test = train_test_split(X, y_performance, test_size=0.2, random_state=42)
        
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        self.performance_model.fit(X_train_scaled, y_train)
        performance_pred = self.performance_model.predict(X_test_scaled)
        performance_mse = mean_squared_error(y_test, performance_pred)
        
        # Train dropout prediction model
        y_dropout = df['dropout_risk']
        X_train_drop, X_test_drop, y_train_drop, y_test_drop = train_test_split(
            X, y_dropout, test_size=0.2, random_state=42
        )
        
        X_train_drop_scaled = self.scaler.fit_transform(X_train_drop)
        X_test_drop_scaled = self.scaler.transform(X_test_drop)
        
        self.dropout_model.fit(X_train_drop_scaled, y_train_drop)
        dropout_pred = self.dropout_model.predict(X_test_drop_scaled)
        dropout_accuracy = accuracy_score(y_test_drop, dropout_pred)
        
        return {
            'performance_mse': performance_mse,
            'dropout_accuracy': dropout_accuracy,
            'feature_importance_performance': dict(zip(X.columns, self.performance_model.feature_importances_)),
            'feature_importance_dropout': dict(zip(X.columns, self.dropout_model.feature_importances_))
        }
    
    def predict_student_outcomes(self, student_data):
        """Predict outcomes for a specific student"""
        # Convert student data to DataFrame
        df = pd.DataFrame([student_data])
        
        # Add encoded categorical variables
        if 'previous_education' in df.columns:
            if 'previous_education' not in self.label_encoders:
                self.label_encoders['previous_education'] = LabelEncoder()
                self.label_encoders['previous_education'].fit(['high_school', 'bachelor', 'master'])
            
            df['previous_education_encoded'] = self.label_encoders['previous_education'].transform(df['previous_education'])
        
        # Prepare features
        X = self.prepare_features(df)
        X_scaled = self.scaler.transform(X)
        
        # Make predictions
        performance_pred = self.performance_model.predict(X_scaled)[0]
        dropout_prob = self.dropout_model.predict_proba(X_scaled)[0][1]  # Probability of dropout
        
        # Generate insights
        insights = self.generate_insights(student_data, performance_pred, dropout_prob)
        
        return {
            'predicted_performance': round(performance_pred, 2),
            'dropout_probability': round(dropout_prob, 3),
            'risk_level': 'High' if dropout_prob > 0.7 else 'Medium' if dropout_prob > 0.3 else 'Low',
            'insights': insights,
            'recommendations': self.generate_recommendations(student_data, performance_pred, dropout_prob)
        }
    
    def generate_insights(self, student_data, performance_pred, dropout_prob):
        """Generate insights based on predictions"""
        insights = []
        
        if performance_pred < 60:
            insights.append("Performance is below average. Consider increasing study time or seeking help.")
        elif performance_pred > 80:
            insights.append("Excellent performance predicted! Keep up the great work.")
        
        if dropout_prob > 0.5:
            insights.append("High risk of dropout detected. Immediate intervention recommended.")
        
        if student_data.get('study_hours_per_week', 0) < 10:
            insights.append("Low study hours may impact performance. Consider increasing study time.")
        
        if student_data.get('assignment_submission_rate', 0) < 0.7:
            insights.append("Low assignment submission rate is concerning. Focus on completing assignments.")
        
        if student_data.get('login_frequency', 0) < 3:
            insights.append("Infrequent platform usage. Regular engagement improves outcomes.")
        
        return insights
    
    def generate_recommendations(self, student_data, performance_pred, dropout_prob):
        """Generate personalized recommendations"""
        recommendations = []
        
        if dropout_prob > 0.5:
            recommendations.append({
                'priority': 'High',
                'action': 'Schedule mentoring session',
                'description': 'Connect with academic advisor for personalized support'
            })
        
        if student_data.get('study_hours_per_week', 0) < 15:
            recommendations.append({
                'priority': 'Medium',
                'action': 'Increase study time',
                'description': 'Aim for 15-20 hours per week for optimal results'
            })
        
        if student_data.get('forum_participation', 0) < 2:
            recommendations.append({
                'priority': 'Low',
                'action': 'Engage with community',
                'description': 'Participate in forums to enhance learning through peer interaction'
            })
        
        if student_data.get('video_completion_rate', 0) < 0.8:
            recommendations.append({
                'priority': 'Medium',
                'action': 'Complete video lessons',
                'description': 'Finish watching all video content for better understanding'
            })
        
        if performance_pred > 85:
            recommendations.append({
                'priority': 'Low',
                'action': 'Consider advanced courses',
                'description': 'You\'re excelling! Try more challenging content to continue growing'
            })
        
        return recommendations
    
    def analyze_learning_patterns(self, student_history):
        """Analyze learning patterns over time"""
        df = pd.DataFrame(student_history)
        
        patterns = {
            'study_consistency': df['study_hours_per_week'].std(),
            'performance_trend': 'improving' if df['performance_score'].iloc[-1] > df['performance_score'].iloc[0] else 'declining',
            'engagement_level': df['login_frequency'].mean(),
            'peak_performance_day': df.groupby('day_of_week')['performance_score'].mean().idxmax() if 'day_of_week' in df.columns else 'Unknown',
            'learning_velocity': df['lessons_completed'].diff().mean() if 'lessons_completed' in df.columns else 0
        }
        
        return patterns

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Please provide student data"}))
        return
    
    try:
        student_data = json.loads(sys.argv[1])
        
        predictor = LearningAnalyticsPredictor()
        
        # Train models (in production, this would be done offline)
        training_results = predictor.train_models()
        
        # Make predictions
        predictions = predictor.predict_student_outcomes(student_data)
        
        result = {
            'predictions': predictions,
            'model_performance': training_results
        }
        
        print(json.dumps(result, indent=2))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
