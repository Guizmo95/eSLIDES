function AddSlideContent(element){
    var tbody = document.getElementById('tbody');
    var tr = document.createElement('tr');

    var id = document.createElement('th');
    var dateInjection = document.createElement('th');
    var dateDerniereModification = document.createElement('th');
    var codeBaps = document.createElement('th');
    var codeRayhane = document.createElement('th');
    var lien = document.createElement('th');
    var editer = document.createElement('th');

    editer.classList.add("border-left");
    editer.id = "editer";

    var a1 = document.createElement('a');
    a1.href="#";
    a1.classList.add('delete');
    a1.id = element['id'];
    var a2 = document.createElement('a');
    a2.href="#";
    a2.id = element['id'];
    a2.classList.add('remplacer');
    a2.setAttribute("href", "#ChangerSlide");
    a2.setAttribute("data-toggle", "modal");

    var i1 = document.createElement('i');
    var i2 = document.createElement('i');
    i1.className  = 'fas fa-trash-alt';
    i2.className = 'fas fa-exchange-alt';

    a1.appendChild(i1);
    a2.appendChild(i2);

    editer.appendChild(a1);
    editer.appendChild(a2);

    id.setAttribute('scope', 'row');
    id.innerHTML = element['id'];


    dateInjection.innerHTML = element['dateInjection'];

    dateDerniereModification.innerHTML = element['dateDerniereModification'];

    codeBaps.innerHTML =  element['codeBaps'];

    codeRayhane.innerHTML = element['codeRayhane'];

    var a3 = document.createElement('a');
    a3.href=base_url + "slideshow/" + element['codeBaps'] + "/" + element['codeRayhane'];
    a3.classList.add('URL');
    a3.id = element['id'];
    var i3 = document.createElement('i');
    i3.className = 'fas fa-link urlIcon';
  
    a3.appendChild(i3);
    lien.appendChild(a3);
    
    tr.appendChild(id);
    tr.appendChild(dateInjection);
    tr.appendChild(dateDerniereModification);
    tr.appendChild(codeBaps);
    tr.appendChild(codeRayhane);
    tr.appendChild(lien);
    tr.appendChild(editer);

    tbody.appendChild(tr);
}

$(document).ready(function (){
        var id = null
  
        $('.delete').on("click", function(){
            $("#deleteConfirm").modal('show');
            id = $(this).attr('id');
        });
      
        $("#oui").on("click", function(){

          $.ajax({
            type: "POST",
            url: base_url + "Visualiser/DeleteSlide/"+id,
            success: function (response) {
                $("#deleteConfirm").modal('hide');
                jQuery(function RefreshPageAdd($){
                    $('#deleteConfirm').on('hidden.bs.modal', function (e) {
                      location.reload();
                    });
                });
                
            },
            error: function(data){
              alert("Erreur, impossible de supprimer le diaporama.");
            }
          });

          $("#deleteConfirm").modal('hide');

        });
        
        $("#non").on("click", function(){
          $("#deleteConfirm").modal('hide');
        });
});


$(document).ready(function(){


        var id = null
  
        $('.remplacer').on("click", function(){
            $("#ChangerSlide").modal('show');
            id = $(this).attr('id');

            $('#submit').on('click', function(e){   
              
              e.preventDefault();  
              var fileInputs = $('.file');
              var formData = new FormData();
              $.each(fileInputs, function(i,fileInput){
                  if( fileInput.files.length > 0 ){
                      $.each(fileInput.files, function(k,file){
                          formData.append('file[]', file);
                      });
                  }
              });
                 $.ajax({  
                       url:base_url + "Visualiser/ChangeSlide/"+id,    
                       method:"POST",  
                       data:formData,  
                       dataType:'json',
                       contentType: false,  
                       cache: false,  
                       processData:false,  
                       success:function(msg)  
                       {  
                          alert("Le Slideshow à bien était remplacer :" + msg);
                       },
                       error: function(msg){
                        alert('Erreur :' + msg);
                       }  
                 }); 
                 

        });
      });
        
 


    


         
         });  
