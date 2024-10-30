from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_mysqldb import MySQL
import os

app = Flask(__name__)

# Configuración de MySQL usando las variables del archivo .env
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
app.secret_key = os.getenv('SECRET_KEY')
mysql = MySQL(app)

@app.route('/')
def inicio():
    return render_template('index.html')

@app.route('/buscar_vino', methods=['GET', 'POST'])
def buscar_vino():
    if request.method == 'POST':
        query = request.form['query']
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Vinos WHERE nombre LIKE %s", (f"%{query}%",))
        vinos = cursor.fetchall()
        cursor.close()
        return render_template('buscar_vino.html', vinos=vinos)
    return render_template('buscar_vino.html')

@app.route('/favoritos')
def favoritos():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT Vinos.nombre FROM Favoritos JOIN Vinos ON Favoritos.vino_id = Vinos.id")
    favoritos = cursor.fetchall()
    cursor.close()
    return render_template('favoritos.html', favoritos=favoritos)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/academia')
def academia():
    return render_template('academia.html')

@app.route('/agenda')
def agenda():
    return render_template('agenda.html')

@app.route('/foro')
def foro():
    return render_template('foro.html')

@app.route('/send_notification', methods=['POST'])
def send_notification():
    event = request.form['event']
    message = request.form['message']
    flash(f'Notificación enviada: {event} - {message}')
    return redirect(url_for('inicio'))

@app.route('/noticias')
def noticias():
    return render_template('noticias.html')

@app.route('/turismo')
def turismo():
    return render_template('turismo.html')

@app.route('/ruta_vino')
def ruta_vino():
    return render_template('ruta_vino.html', api_key=app.config['GOOGLE_MAPS_API_KEY'])

@app.route('/add_opinion', methods=['POST'])
def add_opinion():
    data = request.get_json()
    usuario = data['usuario']
    comentario = data['comentario']
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO Opiniones (usuario, comentario) VALUES (%s, %s)", (usuario, comentario))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"success": True})

@app.route('/get_opinions', methods=['GET'])
def get_opinions():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT usuario, comentario FROM Opiniones")
    opiniones = cursor.fetchall()
    cursor.close()
    connection.close()
    opiniones_list = [{"usuario": op[0], "comentario": op[1]} for op in opiniones]
    return jsonify(opiniones_list)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
