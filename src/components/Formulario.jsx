import React, { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false);
  useEffect(()=>{
      if(Object.keys(paciente).length){
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario);
        setEmail(paciente.email);
        setFecha(paciente.fecha);
        setSintomas(paciente.sintomas);
      }
  },[paciente]);
  const generarId =()=>{
    const random = Math.random().toString(36).substring(2);
    const fecha= Date.now().toString(36);
    return fecha+ random 
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    //validacion del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    //objeto de pacientes
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    };
    if(paciente.id){
      //editando el registro
      objetoPaciente.id=paciente.id;
      
      const pacientesActualizados = pacientes.map(pacienteState=>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      )
      setPacientes(pacientesActualizados);
      setPaciente({})
    }else{
      objetoPaciente.id = generarId();
      //agregando un nuevo registro
      setPacientes([...pacientes, objetoPaciente]);
    }
      
    setNombre("");
    setPropietario("");
    setEmail("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>
      <form
        action=""
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit}
      >
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mt-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascosta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="emial"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="emial"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            name=""
            id="sintomas"
            placeholder="Describe los Sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold mt-5 hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id?'Editar Paciente':'Agregar Paciente'}
        />
      </form>
    </div>
  );
};

export default Formulario;
