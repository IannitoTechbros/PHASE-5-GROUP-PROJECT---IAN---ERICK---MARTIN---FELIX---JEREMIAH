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

@app.route('/spaces/<int:id>', methods=['PUT'])
@jwt_required()
def update_space(id):
    data = request.get_json()
    space = Space.query.get(id)
    if space:
        space.name = data.get('name', space.name)
        space.location = data.get('location', space.location)
        space.capacity = data.get('capacity', space.capacity)
        space.amenities = data.get('amenities', space.amenities)
        space.ratecard = data.get('ratecard', space.ratecard)
        space.image = data.get('image', space.image)
        space.booked = data.get('booked', space.booked)  
        db.session.commit()
        return jsonify({'message': 'Space updated successfully'})
    return jsonify({'message': 'Space not found'}), 404

@app.route('/spaces', methods=['GET'])
@jwt_required()
def get_spaces():
    spaces = Space.query.all()
    return jsonify([{
        'id': space.id,
        'name': space.name,
        'location': space.location,
        'capacity': space.capacity,
        'amenities': space.amenities,
        'ratecard': space.ratecard,
        'image': space.image,
        'isBooked': space.booked
    } for space in spaces])

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

@app.route('/mpesa-callback', methods=['POST'])
def mpesa_callback():
    data = request.get_json()
    app.logger.info(f"Callback data received: {data}")

    result_code = data['Body']['stkCallback']['ResultCode']
    merchant_request_id = data['Body']['stkCallback']['MerchantRequestID']
    
    if result_code == 0:  # Successful payment
        mpesa_receipt_number = data['Body']['stkCallback']['CallbackMetadata']['Item'][1]['Value']
        
        booking = Booking.query.filter_by(id=merchant_request_id).first()
        if booking:
            booking.payment_status = 'completed'
            booking.mpesa_receipt_number = mpesa_receipt_number
            db.session.commit()
            app.logger.info(f"Payment successful for booking ID {merchant_request_id}")
    
    return jsonify({'message': 'Callback received'}), 200



if __name__ == '__main__':
    app.run(debug=True)

@app.route('/spaces/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_space(id):
    space = Space.query.get(id)
    if space:
        db.session.delete(space)
        db.session.commit()
        return jsonify({'message': 'Space deleted successfully'})
    return jsonify({'message': 'Space not found'}), 404

