const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://rikixd07:brorespeta09@smiledent.z7hsxyc.mongodb.net/smiledent?retryWrites=true&w=majority&appName=SMILEDENT";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Conectado exitosamente a MongoDB Atlas");
    inicializarBaseDeDatos();
  })
  .catch(err => console.error("Error al conectar a MongoDB:", err));

const agendaSchema = new mongoose.Schema({
  id_paciente: String,
  nombre: String,
  archivo_estudio: String,
  doctor: String,
  cedula: String,
  especialidad: String,
  pago: Number,
  folio: String
}, { collection: 'agenda_finanzas' }); 
const Agenda = mongoose.model('Agenda', agendaSchema);

const seguridadSchema = new mongoose.Schema({
  id_paciente: String,
  hallazgo_clinico: String,
  evolucion: String,
  seguridad: { type: String, default: "AES-256" },
  acceso: String
}, { collection: 'seguridad_clinica' });
const Seguridad = mongoose.model('Seguridad', seguridadSchema);

const identidadSchema = new mongoose.Schema({
  id_paciente: String,
  nombre: String,
  rfc: String,
  ocupacion: String,
  direccion: String,
  condicion_salud: String,
  emergencia_contacto: String,
  telefono: String,
  edad: Number,
  email: String
}, { collection: 'identidad_salud' });
const Identidad = mongoose.model('Identidad', identidadSchema);

async function inicializarBaseDeDatos() {
  try {
    const conteo = await Agenda.countDocuments();
    
    if (conteo === 0) {
      console.log("Generando las 3 colecciones independientes en Atlas...");

      const datosAgenda = [
        { id_paciente: "002", nombre: "Ana López", archivo_estudio: "Serie Periapical", doctor: "Dra. Elena Morales", cedula: "1234560", especialidad: "Endodoncia", pago: 2500, folio: "ADM-2026-002" },
        { id_paciente: "003", nombre: "Jorge Ramírez", archivo_estudio: "Set Fotográfico HD", doctor: "Dr. Roberto Pérez", cedula: "9876542", especialidad: "Rehabilitación", pago: 8000, folio: "ADM-2026-003" },
        { id_paciente: "004", nombre: "María Torres", archivo_estudio: "Mapeo Intraoral", doctor: "Dra. Sofía Sánchez", cedula: "3456782", especialidad: "Odont. General", pago: 3500, folio: "ADM-2026-004" },
        { id_paciente: "005", nombre: "Luis Herrera", archivo_estudio: "RX Digital Visiógrafo", doctor: "Dr. Mario Ramírez", cedula: "5678901", especialidad: "Endodoncia", pago: 4200, folio: "ADM-2026-005" },
        { id_paciente: "006", nombre: "Sofía Martínez", archivo_estudio: "Cefalometría Computarizada", doctor: "Dra. Lucía López", cedula: "2345671", especialidad: "Ortodoncia", pago: 15000, folio: "ADM-2026-006" },
        { id_paciente: "007", nombre: "Ricardo Peña", archivo_estudio: "RX Coronaria (Bitewing)", doctor: "Dr. Hugo Torres", cedula: "6789012", especialidad: "Prótesis", pago: 6000, folio: "ADM-2026-007" },
        { id_paciente: "008", nombre: "Elena Vega", archivo_estudio: "Fotografía de Perfil Facial", doctor: "Dra. Karla Castro", cedula: "8901234", especialidad: "Odont. Estética", pago: 12000, folio: "ADM-2026-008" },
        { id_paciente: "009", nombre: "Pablo Ríos", archivo_estudio: "Tomografía Cone Beam", doctor: "Dr. Javier Ruiz", cedula: "9012345", especialidad: "Implantología", pago: 20000, folio: "ADM-2026-009" },
        { id_paciente: "010", nombre: "Diana Solís", archivo_estudio: "Registro Fotográfico Control", doctor: "Dra. Mónica Ortiz", cedula: "0123456", especialidad: "Periodoncia", pago: 12000, folio: "ADM-2026-010" }
      ];

      const datosSeguridad = [
        { id_paciente: "002", hallazgo_clinico: "Tercer molar impactado", evolucion: "Cicatrización post-op", acceso: "Nivel 3" },
        { id_paciente: "003", hallazgo_clinico: "Edentulismo Parcial", evolucion: "Ajuste protésico", acceso: "Doctor" },
        { id_paciente: "004", hallazgo_clinico: "Cromatismo dental", evolucion: "Sensibilidad dental", acceso: "Nivel 3" },
        { id_paciente: "005", hallazgo_clinico: "Absceso Periapical (K04.7)", evolucion: "Conductometría final", acceso: "Nivel 3" },
        { id_paciente: "006", hallazgo_clinico: "Maloclusión Clase II", evolucion: "Ajuste ortodoncia", acceso: "Nivel 3" },
        { id_paciente: "007", hallazgo_clinico: "Fractura Coronaria pza 21", evolucion: "Prep. corona E-max", acceso: "Doctor" },
        { id_paciente: "008", hallazgo_clinico: "Bruxismo / Desgaste", evolucion: "Impresión carillas", acceso: "Doctor" },
        { id_paciente: "009", hallazgo_clinico: "Reabsorción Ósea", evolucion: "Oseointegración", acceso: "Admin" },
        { id_paciente: "010", hallazgo_clinico: "Gingivitis por placa", evolucion: "Limpieza ultrasonido", acceso: "Nivel 3" }
      ];

      const datosIdentidad = [
        { id_paciente: "002", nombre: "Ana López García", rfc: "LOGA910210-GT1", ocupacion: "Docente", direccion: "Insurgentes Sur 45, CDMX", condicion_salud: "Sano", emergencia_contacto: "Jorge López (55-1112-2233)", telefono: "55-1234-5678", edad: 28, email: "ana.logar@gmail.com" },
        { id_paciente: "003", nombre: "Jorge Ramírez Soto", rfc: "RASJ630320-LRS", ocupacion: "Pensionado", direccion: "Roma Nte. 88, CDMX", condicion_salud: "Hipertensión", emergencia_contacto: "María Soto (55-3334-4455)", telefono: "55-8877-6655", edad: 62, email: "jorge.ramirez@gmail.com" },
        { id_paciente: "004", nombre: "María Torres Díaz", rfc: "TODM980412-RS2", ocupacion: "Estudiante", direccion: "Polanco Secc. 12, CDMX", condicion_salud: "Gastritis y Polvo", emergencia_contacto: "Rosa Díaz (55-7778-8899)", telefono: "55-2233-4455", edad: 26, email: "m.torres@gmail.com" },
        { id_paciente: "005", nombre: "Luis Herrera León", rfc: "HELH740625-HS9", ocupacion: "Comerciante", direccion: "Del Valle 5, CDMX", condicion_salud: "Lipemia y Mariscos", emergencia_contacto: "Carmen León (55-1998-8776)", telefono: "55-6655-4433", edad: 49, email: "l.herrera@gmail.com" },
        { id_paciente: "006", nombre: "Sofía Martínez Cruz", rfc: "MACS051122-RT4", ocupacion: "Estudiante", direccion: "Coyoacán 210, CDMX", condicion_salud: "Anemia leve", emergencia_contacto: "Pedro Martínez (55-6667-778)", telefono: "55-0011-2233", edad: 21, email: "sofia.mtz@gmail.com" },
        { id_paciente: "007", nombre: "Ricardo Peña Luna", rfc: "PELR870705-PL0", ocupacion: "Arquitecto", direccion: "Amsterdam 14, CDMX", condicion_salud: "Migraña e Ibuprofeno", emergencia_contacto: "Claudia Luna (55-4443-3322)", telefono: "55-4433-2211", edad: 37, email: "r.pena@gmail.com" },
        { id_paciente: "008", nombre: "Elena Vega Blas", rfc: "VEBE951010-VB3", ocupacion: "Diseñadora", direccion: "Santa Fe 400, CDMX", condicion_salud: "Asma y Látex", emergencia_contacto: "Alberto Vega (55-2221-1100)", telefono: "55-7788-9900", edad: 30, email: "e.vega@gmail.com" },
        { id_paciente: "009", nombre: "Pablo Ríos Mora", rfc: "RIMP820315-RM7", ocupacion: "Contador", direccion: "Lindavista 402, CDMX", condicion_salud: "Hipotiroidismo y Sulfas", emergencia_contacto: "Lucía Mora (55-9990-0011)", telefono: "55-9900-1122", edad: 42, email: "pablo.rios@gmail.com" },
        { id_paciente: "010", nombre: "Diana Solís Orta", rfc: "SOOD921212-SO4", ocupacion: "Abogada", direccion: "Tlalpan Centro 9, CDMX", condicion_salud: "Sano", emergencia_contacto: "Sergio Solís (55-8889-9900)", telefono: "55-3344-5566", edad: 33, email: "diana.solis@gmail.com" }
      ];

      await Agenda.insertMany(datosAgenda);
      await Seguridad.insertMany(datosSeguridad);
      await Identidad.insertMany(datosIdentidad);

      console.log("Se crearon las 3 colecciones por separado con éxito.");
    } else {
      console.log("Las colecciones ya cuentan con registros en Atlas.");
    }
  } catch (error) {
    console.error("Error en la carga masiva dividida:", error);
  }
}

app.post('/registro-agenda', async (req, res) => {
  try { const nuevo = new Agenda(req.body); await nuevo.save(); res.status(201).json({ mensaje: "Guardado" }); } catch (error) { res.status(400).json({ error: error.message }); }
});
app.post('/registro-seguridad', async (req, res) => {
  try { const nuevo = new Seguridad(req.body); await nuevo.save(); res.status(201).json({ mensaje: "Guardado" }); } catch (error) { res.status(400).json({ error: error.message }); }
});
app.post('/registro-identidad', async (req, res) => {
  try { const nuevo = new Identidad(req.body); await nuevo.save(); res.status(201).json({ mensaje: "Guardado" }); } catch (error) { res.status(400).json({ error: error.message }); }
});

app.listen(5000, () => console.log("Servidor SMILEDENT activo en el puerto 5000"));