const URL_API = "https://restcountries.com/v3.1/lang/spanish";

async function obtenerPaises() {
    try {
        let listaPaises = localStorage.getItem("listaPaises");

        if (!listaPaises) {
            const respuesta = await fetch(URL_API);
            listaPaises = await respuesta.json();
            localStorage.setItem("listaPaises", JSON.stringify(listaPaises));
        } else {
            listaPaises = JSON.parse(listaPaises);
        }

        mostrarListaPaises(listaPaises);

        const campoBusqueda = document.getElementById("buscador");
        if (campoBusqueda) {
            campoBusqueda.addEventListener("input", () => filtrarPaises(listaPaises, campoBusqueda.value));
        }

        const selectorRegion = document.getElementById("seleccionar-region");
        if (selectorRegion) {
            selectorRegion.addEventListener("change", () => filtrarPorRegion(listaPaises, selectorRegion.value));
        }
    } catch (error) {
        console.error("Error al obtener los países:", error);
    }
}

function mostrarListaPaises(listaPaises) {
    const cajaPaises = document.querySelector("#caja-paises") || document.querySelector("#caja-regiones");
    if (!cajaPaises) return;

    cajaPaises.innerHTML = "";
    listaPaises.forEach((pais) => {
        const tarjetaPais = document.createElement("div");
        tarjetaPais.className = "tarjeta";
        tarjetaPais.innerHTML = `
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.translations.spa.common}" width="100">
            <h3>${pais.translations.spa.common}</h3>
        `;
        tarjetaPais.addEventListener("click", () => mostrarDetallesPais(pais));
        cajaPaises.appendChild(tarjetaPais);
    });
}

function filtrarPaises(listaPaises, texto) {
    const paisesFiltrados = listaPaises.filter((pais) =>
        pais.translations.spa.common.toLowerCase().includes(texto.toLowerCase())
    );
    mostrarListaPaises(paisesFiltrados);
}

function filtrarPorRegion(listaPaises, region) {
    if (!region) {
        mostrarListaPaises(listaPaises);
        return;
    }
    const paisesFiltrados = listaPaises.filter((pais) => pais.region === region);
    mostrarListaPaises(paisesFiltrados);
}

function mostrarDetallesPais(pais) {
    const ventana = document.querySelector("#ventana");
    const contenidoVentana = document.querySelector("#contenido-ventana");

    contenidoVentana.innerHTML = `
        <span id="cerrar-ventana">&times;</span>
        <img src="${pais.flags.svg}" alt="Bandera de ${pais.translations.spa.common}" width="100">
        <h2>${pais.translations.spa.common}</h2>
        <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "N/A"}</p>
        <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
        <p><strong>Región:</strong> ${pais.region}</p>
        <p><strong>Subregión:</strong> ${pais.subregion || "N/A"}</p>
        <p><strong>Área:</strong> ${pais.area.toLocaleString()} km²</p>
    `;

    ventana.style.display = "flex";
    setTimeout(() => {
        ventana.classList.add("mostrar");
    }, 10);

    document.querySelector("#cerrar-ventana").addEventListener("click", () => {
        ventana.classList.remove("mostrar");
        setTimeout(() => {
            ventana.style.display = "none";
        }, 300);
    });
}

if (document.title.includes("Lista de Países") || document.title.includes("Región")) {
    document.addEventListener("DOMContentLoaded", obtenerPaises);
}