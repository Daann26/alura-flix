import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useVideoDataContext } from "../../context/index";
import styles from "./NuevoVideo.module.css";

const NuevoVideo = () => {
  const { handleAddVideo, fetchVideos } = useVideoDataContext();
  const navigate = useNavigate();
  const initialVideoState = {
    titulo: "",
    categoria: "",
    imagenVideo: "",
    video: "",
    descripcion: "",
  };
  const [newVideo, setNewVideo] = useState(initialVideoState);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/Daann26/alura-flix-api/videos"
        );
        const uniqueCategorias = [
          ...new Set(response.data.map((video) => video.categoria)),
        ];
        setCategorias(uniqueCategorias);
      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddVideo(newVideo);
      setNewVideo(initialVideoState);
      fetchVideos();
      navigate("/");
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  return (
    <div className={styles.newVideoContainer}>
      <div className={styles.cabeceraForm}>
        <h2 className={styles.tituloCabecera}>NUEVO VIDEO</h2>
        <p className={styles.parrafoCabecera}>
          Complete el formulario para crear una nueva tarjeta de video.
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.sectionForm}>
          <div className={styles.formIzquierdo}>
            <div className={styles.campo}>
              <label className={styles.label}>
                Título:
                <input
                  type="text"
                  name="titulo"
                  value={newVideo.titulo}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingrese el título"
                  required
                />
              </label>
            </div>
            <div className={styles.campo}>
              <label className={styles.label}>
                Imagen:
                <input
                  type="text"
                  name="imagenVideo"
                  value={newVideo.imagen}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="URL de la imagen"
                  required
                />
              </label>
            </div>
            <div className={styles.campo}>
              <label className={styles.label}>
                Descripción:
                <textarea
                  name="descripcion"
                  value={newVideo.descripcion}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="¿De qué se trata el video?"
                  required
                />
              </label>
            </div>
          </div>
          <div className={styles.formDerecho}>
            <div className={styles.campo}>
              <label className={styles.label}>
                Categoría:
                <select
                  name="categoria"
                  value={newVideo.categoria}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="" disabled>
                    Seleccione la categoría
                  </option>
                  {categorias.map((cat) => (
                    <option
                      className={styles.listNewvideo}
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles.campo}>
              <label className={styles.labelUrl}>
                Video:
                <input
                  type="text"
                  name="video"
                  value={newVideo.video}
                  onChange={handleChange}
                  className={styles.inputUrl}
                  placeholder="URL del video"
                  required
                />
              </label>
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.btnGuardar}>
            Guardar
          </button>
          <button
            type="button"
            className={styles.btnLimpiar}
            onClick={() => setNewVideo(initialVideoState)}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoVideo;
