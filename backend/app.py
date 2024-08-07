from config import *
from flask_cors import CORS
from models import User, Space, Booking
from config import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from flask import send_from_directory, request, jsonify, make_response
import os

CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

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

    access_token = create_access_token(identity={'id': user.id, 'role': user.role}) 
    return make_response(jsonify(access_token=access_token, user=user.to_dict()), 200)


@app.route('/spaces', methods=['POST'])
@jwt_required()
def create_space():
    if 'image' not in request.files:
        return jsonify({'message': 'No image file part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    
    if not (request.form.get('name') and request.form.get('location')):
        return jsonify({'message': 'Missing required fields'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    file.save(file_path)

    data = request.form
    new_space = Space(
        name=data.get('name'),
        location=data.get('location'),
        capacity=data.get('capacity'),
        amenities=data.get('amenities'),
        ratecard=data.get('ratecard'),
        image=f"/uploads/{filename}"  
    )
    db.session.add(new_space)
    db.session.commit()

    return jsonify({'message': 'Space created successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)