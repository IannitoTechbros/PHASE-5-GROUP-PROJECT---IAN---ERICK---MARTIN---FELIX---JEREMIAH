from flask import Flask, make_response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///space.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '57f804c427f744988ae5e25ef4067a0c'
app.config['JWT_SECRET_KEY'] = '12345'
app.config['UPLOAD_FOLDER'] = 'uploads/'  
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


db = SQLAlchemy(metadata=metadata)
db.init_app(app)
migrate = Migrate(app, db)