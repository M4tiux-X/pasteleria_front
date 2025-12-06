import '../css/main.css'

function Home(){
    return(
        <main>
            <h2 id="titulo-principal" className="titulo-principal">Todos Los Productos</h2>
            <div className="contenedor-login">
                <button id="login" className="boton-login "><i></i><a href="/login">Login</a></button>
            </div>
            <div id="contenedor-productos" className="contenedor-productos">
            </div>
            <h3>lorem</h3>
        </main>
    )
    
}
export default Home;