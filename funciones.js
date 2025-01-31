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

function mostrarPaises(paises) {
    const contenedor = document.querySelector("#contenedor-paises");
    paises.forEach((pais) => {
        const elementoPais = document.createElement("div");
        elementoPais.className = "pais";
        elementoPais.innerHTML = `
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" width="50">
            <h3>${pais.name.common}</h3>
            <p>Capital: ${pais.capital ? pais.capital[0] : "N/A"}</p>
            <p>Población: ${pais.population.toLocaleString()}</p>
        `;
        contenedor.appendChild(elementoPais);
    });
}

if (document.title === "Lista de Países") {
    document.addEventListener("DOMContentLoaded", cargarPaises);
}