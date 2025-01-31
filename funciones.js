const API_URL = "https://restcountries.com/v3.1/all";

async function cargarPaises() {
    try {
        let paises = localStorage.getItem("paises");

        if (!paises) {
            const respuesta = await fetch(API_URL);
            paises = await respuesta.json();
            localStorage.setItem("paises", JSON.stringify(paises));
        } else {
            paises = JSON.parse(paises);
        }

        mostrarPaises(paises);
    } catch (error) {
        console.error("Error al cargar los países:", error);
    }
}