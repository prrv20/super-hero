var miHeroe = ""

$(function(){
    
    $('#buscar').click(()=>{
       buscarHero()
    })

})

function buscarHero(){
    let id_hero = $('#busqueda').val()
    
    if(!validar_id(id_hero)){
        //
        errorInput()
        return
    }

    getHero(id_hero)
}

function validar_id(id){

    let expression = /^\d{1,3}$/
    
    if(expression.test(id)){
        return true
    }
    return false
}

function errorInput(){
    alert("Carácteres no Válidos, debes Ingresar Números")
    $('#busqueda').focus().val("")
    
}

function getHero(id){
    $.ajax({
        type:"GET",
        url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
        success:function(response){
            console.log(response)
            
            $('#cards').contents().remove()
            $('#cards').append(crearTarjeta(response))
            $('#busqueda').val("").focus()
            
            graficarPoderes(response)
            verPoderes(id)
        },
        error:function(error){
            console.log(error)
            
        }
    })
}

function crearTarjeta(heroe){
    let card = `
    <div class="col-12 col-md-8">
        <h5 class="text-center my-2">SuperHero Encontrado</h5>
        <div class="card">
            <img src="${heroe.image.url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h6 class="card-title">Nombre: ${heroe.name}</h6>
                <div>Conexiones: ${heroe.connections["group-affiliation"]}</div><br><br>
                <div>Publicado por: ${heroe.biography.publisher}</div>
                <hr>
                <div>Ocupación: ${heroe.work.occupation}</div>
                <hr>
                <div>Primera Aparición: ${heroe.biography["first-appearance"]}</div>
                <hr>
                <div>Altura: ${heroe.appearance.height[0]} - ${heroe.appearance.height[1]}</div>
                <hr>
                <div>Peso: ${heroe.appearance.weight[0]} - ${heroe.appearance.weight[1]}</div>
                <hr>
                <div>Alianzas: ${heroe.biography.aliases}</div>   
            </div>
        </div>
    </div>
    `
    return card
}
function verPoderes(id){
    $.ajax({
        type:"GET",
        url:`https://www.superheroapi.com/api.php/4905856019427443/${id}/powerstats`,
        success:function(poder){
            console.log(poder)
            
        },
        error: function(error){
            console.log(error)
        }
        
    })
   
}
function graficarPoderes(miHeroe){
    var options = {
        title: {
            text: `Estadisticas de Poder para ${miHeroe.name}`//
            
        },
        subtitles: [{
            text: ""
        }],
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 180,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
               
                { y: `${miHeroe.powerstats.intelligence}`, label: "intelligence" },
                { y: `${miHeroe.powerstats.strength}`, label: "strength" },
                { y: `${miHeroe.powerstats.speed}`, label: "speed" },
                { y: `${miHeroe.powerstats.durability}`, label: "durability" },
                { y: `${miHeroe.powerstats.power}`, label: "power" },
                { y: `${miHeroe.powerstats.combat}`, label: "combat" },
            ]
        }]
    };
    $("#grafico").CanvasJSChart(options);
}





