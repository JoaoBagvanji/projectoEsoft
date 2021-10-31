

var firebaseConfig = {
    apiKey: "AIzaSyB4AEiZyenkODSzGidD4Igf7cXWwyHS2v8",
    authDomain: "login-58320.firebaseapp.com",
    projectId: "login-58320",
    storageBucket: "login-58320.appspot.com",
    messagingSenderId: "47727001221",
    appId: "1:47727001221:web:25d3261d434ac0eafeb3ec",
    measurementId: "G-17LWJBTJ2V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var No;
function Select_AllData(){
    document.getElementById("tbody1").innerHTML="";
    No=0;
    firebase.database().ref('temas').once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var titulo = childSnapshot.val().TituloTema;
            var curso = childSnapshot.val().Curso;
            var disponibilidade = childSnapshot.val().Disponibilidade;
            var responsavel = childSnapshot.val().Responsavel;
            AddItemtoTable(titulo,curso,disponibilidade,responsavel);
        });
    });
}

window.onload = Select_AllData;

var TList=[];
var titulo,curso,disponibilidade,responsavel;

function AddItemtoTable(titulo,curso,disponibilidade,responsavel){
    var tbody1 =  document.getElementById("tbody1");
    var trow = document.createElement("tr");
    var td0 = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    TList.push([titulo,curso,disponibilidade,responsavel]);
    td0.innerHTML = ++No;
    td1.innerHTML = titulo;
    td2.innerHTML = curso;
    td3.innerHTML = responsavel;
    td4.innerHTML = disponibilidade;
    td1.classList += "tituloField";
    td2.classList += "cursoField";
    td3.classList += "responsavelField";
    td4.classList += "disponibilidadeField";
    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);

    var ControlDiv = document.createElement("div");
    ControlDiv.innerHTML = '<button type="button" class="btn btn-primary my-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes(null)">Adicionar </button>'
    ControlDiv.innerHTML += '<button type="button" class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes('+No+')">Editar </button>'

    trow.appendChild(ControlDiv);
    tbody1.appendChild(trow);

}


var ModTitulo = document.getElementById('TituloMod');
var ModCurso = document.getElementById('CursoMod');
var ModDispo = document.getElementById('DispoMod');
var ModRespo = document.getElementById('RespoMod');

var BTNmodAdd = document.getElementById('AddModBtn');
var BTNmodUpd = document.getElementById('UpdModBtn');
var BTNmodDel = document.getElementById('DelModBtn');

function FillTboxes(index){
    if(index==null){
       ModTitulo.value = "";
       ModCurso.value = "";
       ModDispo.value = "";
       ModRespo.value = "";
       BTNmodAdd.style.display = 'inline-block';
       BTNmodUpd.style.display = 'none';
       BTNmodDel.style.display = 'none';
    }

    else{
        --index;
        ModTitulo.value = TList[index][0];
        ModCurso.value = TList[index][1];
        ModDispo.value = TList[index][2];
        ModRespo.value = TList[index][3];
        ModCurso.disabled=true;
        BTNmodAdd.style.display = 'none';
        BTNmodUpd.style.display = 'inline-block';
        BTNmodDel.style.display = 'inline-block';
    }
}

//Adicionar Tema
function AddTem(){
    firebase.database().ref("temas/"+ModCurso.value).set(
        {
            TituloTema: ModTitulo.value,
            Curso: ModCurso.value,
            Disponibilidade: ModDispo.value,
            Responsavel: ModRespo.value
        },
        (error) =>{
            if(error){
                alert("Nao foi adicionado o tema, Ha algum problema");
            }
            else{
                alert("Tema adicionado com sucesso");
                Select_AllData();
                //exampleModalCenter id da componente modal
                $("#exampleModalCenter").modal('hide');
            }
        }
    )
}

//Actualizar Tema
function UpdTem(){
    firebase.database().ref("temas/"+ModCurso.value).update(
        {
            TituloTema: ModTitulo.value,
            Disponibilidade: ModDispo.value,
            Responsavel: ModRespo.value
        },
        (error) =>{
            if(error){
                alert("Nao foi actualizado o tema, Ha algum problema");
            }
            else{
                alert("Tema actualizado com sucesso");
                Select_AllData();
                //exampleModalCenter id da componente modal
                $("#exampleModalCenter").modal('hide');
            }
        }
    )
}


//Apagar Tema

function DelTem(){
    firebase.database().ref("temas/"+ModCurso.value).remove().then(
        function(){
            alert("Tema actualizado com sucesso");
            Select_AllData();
            //exampleModalCenter id da componente modal
            $("#exampleModalCenter").modal('hide');
        }
    )
}

var pesquisabarra = document.getElementById("PesquisarBarra");
var pesquisaBtn = document.getElementById("BtnPesquisa");
var categoria = document.getElementById("CategoriaS");
var tbody = document.getElementById("tbody1");

//Funcao de pesquisa
function PesquisaTable(Categoria){

    var filter = pesquisabarra.value.toUpperCase();
    var tr = tbody.getElementsByTagName("tr");
    var found;

    for(let i = 0;i < tr.length; i++){
        var td = tr[i].getElementsByClassName(Categoria);

        for (let j = 0; j < td.length; j++){
            if(td[j].innerHTML.toUpperCase().indexOf(filter) > -1){ // Dados coencidem com valores da tabela
                found = true;
            }
        }

        if(found){
            tr[i].style.display="";
            found=false;
        }

        else{
            tr[i].style.display="none"; 
        }
    }

}
//Pesquisar por valores exactos
function PesquisaTableByExactValues(Categoria){

    var filter = pesquisabarra.value.toUpperCase();
    var tr = tbody.getElementsByTagName("tr");
    var found;

    for(let i = 0;i < tr.length; i++){
        var td = tr[i].getElementsByClassName(Categoria);

        for (let j = 0; j < td.length; j++){
            if(td[j].innerHTML.toUpperCase() == filter){ // Dados coencidem com valores da tabela
                found = true;
            }
        }

        if(found){
            tr[i].style.display="";
            found=false;
        }

        else{
            tr[i].style.display="none"; 
        }
    }

}

pesquisaBtn.onclick = function(){
    if(pesquisabarra.value==""){
        PesquisaTable("tituloField");
    }

    else if(categoria.value==1)
    PesquisaTable("tituloField");

    else if(categoria.value==2)
    PesquisaTableByExactValues("cursoField");

    else if(categoria.value==3)
    PesquisaTable("disponibilidadeField");

    else if(categoria.value==4)
    PesquisaTable("responsavelField");

}

pesquisabarra.onkeypress = function(event){
    if(event.keyCode==13){
            pesquisaBtn.click();
    }
}