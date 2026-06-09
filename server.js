const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(__dirname)); 
app.use(cors()); 

const MONGO_URI = "mongodb+srv://rikixd07:e16rup07@smiledent.z7hsxyc.mongodb.net/hospital?retryWrites=true&w=majority&appName=SMILEDENT";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Conexion establecida exitosamente con MongoDB Atlas"))
    .catch(err => console.error("Error de conexion en la base de datos:", err));

const PacienteSchema = new mongoose.Schema({
    id_paciente: String,
    rfc: String,
    nombre: String,
    edad: String,
    ocupacion: String,
    telefono: String,
    email: String,
    direccion: String,
    contacto_emergencia: String,
    condicion_salud: String,
    hallazgo_clinico: String,
    doctor: String,
    especialidad: String,
    pago: String,
    folio: String
});

const Paciente = mongoose.model('Paciente', PacienteSchema);

app.post('/api/pacientes', async (req, res) => {
    try {
        const nuevoPaciente = new Paciente(req.body);
        await nuevoPaciente.save();
        res.json({ mensaje: "Expediente medico almacenado en la nube de datos correctamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo realizar el almacenamiento en el servidor." });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor de SMILEDENT activo y escuchando en http://localhost:${PORT}`);
});