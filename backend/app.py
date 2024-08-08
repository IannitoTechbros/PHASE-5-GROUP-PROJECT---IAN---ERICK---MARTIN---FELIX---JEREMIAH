from config import *
from flask_cors import CORS
from models import User, Space, Booking
from config import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from flask import send_from_directory, request, jsonify, make_response
import os

CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})




def format_phone_number(number):
    if number.startswith('0'):
        return f'254{number[1:]}'
    elif number.startswith('254'):
        return number
    else:
        raise ValueError("Invalid phone number format")

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    new_user = User(
        name=data['name'], 
        email=data['email'], 
        password=hashed_password,
    )
    db.session.add(new_user)
    db.session.commit()
    return make_response(jsonify({'message': 'User created successfully'}), 201)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({'message': 'Email and password are required'}))

    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return make_response(jsonify({'message': 'Invalid email or password'}), 401)



    return make_response(jsonify(access_token= access_token, user=user.to_dict()), 200)
@app.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user = User.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    return jsonify({'message': 'User not found'}), 404



if __name__ == '__main__':
    app.run(debug=True)