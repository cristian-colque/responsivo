// Función del mapa (asegúrate de cargar la API de Google Maps)
function initMap() {
  const ubicacion = { lat: -24.1858, lng: -65.2995 };
  const mapa = new google.maps.Map(document.getElementById('mapa'), {
    zoom: 12,
    center: ubicacion
  });
  new google.maps.Marker({
    position: ubicacion,
    map: mapa
  });
}

 // Validación con spinner 
 $('#formContacto').on('submit', function(e) {
  e.preventDefault();
  $(this).append('<div class="spinner-border text-light ms-3" role="status"></div>');
  setTimeout(() => {
    alert('Mensaje enviado con éxito');
    $('.spinner-border').remove();
    this.reset();
  }, 2000);
});

// Contador animado (solo para index)
if ($('body').hasClass('pagina-index')) {
  const objetivo = 5000;
  const velocidad = 30;
  let count = 0;

  function iniciarContador() {
    count = 0;
    const interval = setInterval(() => {
      if (count < objetivo) {
        count += 10;
        $('#contador').text(count);
      } else {
        clearInterval(interval);
        setTimeout(iniciarContador, 1000);
      }
    }, velocidad);
  }

  iniciarContador();

  // Efecto hover para index
  $('.card').hover(
    function() {
      $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)');
    },
    function() {
      $(this).removeClass('shadow-lg').css('transform', 'translateY(0)');
    }
  );
}

//jQuery para filtros y efectos -pagina-clases
if ($('body').hasClass('pagina-clases')){
  $(document).ready(function(){
    // Inicializar Masonry
    $('.masonry-grid').masonry({
        itemSelector: '.col-md-4',
        percentPosition: true
    });

    // Filtrado de clases
    $('.filter-buttons button').click(function(){
        $('.filter-buttons button').removeClass('active');
        $(this).addClass('active');
        
        var filterValue = $(this).attr('data-filter');
        
        if(filterValue == 'all') {
            $('.filter-item').removeClass('hidden');
        } else {
            $('.filter-item').addClass('hidden');
            $('.filter-item.'+filterValue).removeClass('hidden');
        }
        
        // Re-layout Masonry después de filtrar
        $('.masonry-grid').masonry('layout');
    });

    // Efecto hover para tarjetas
    $('.card').hover(
        function() {
            $(this).find('.card-img-overlay').css('opacity', '1');
        },
        function() {
            $(this).find('.card-img-overlay').css('opacity', '0');
        }
    );
});
}

if ($('body').hasClass('pagina-entrenadores')){

  $(document).ready(function() {
    // Función para animar las barras de habilidad
    function animateSkills() {
        $('.progress-bar').each(function() {
            var $this = $(this);
            var skillValue = $this.data('skill');
            var $skillValueText = $this.closest('.skill-bar').find('.skill-value');
            
            // Resetear a 0 antes de animar
            $this.attr('aria-valuenow', 0).css('width', '0%');
            $skillValueText.text('0%');
            
            // Animación con jQuery
            $({ count: 0 }).animate({ count: skillValue }, {
                duration: 2000,
                step: function() {
                    var value = Math.floor(this.count);
                    $this.attr('aria-valuenow', value).css('width', value + '%');
                    $skillValueText.text(value + '%');
                },
                complete: function() {
                    $this.attr('aria-valuenow', skillValue).css('width', skillValue + '%');
                    $skillValueText.text(skillValue + '%');
                }
            });
        });
    }
    
    // Animación inicial al cargar
    animateSkills();
    
    // Sistema de repetición cada 5 segundos
    setInterval(function() {
        animateSkills();
    }, 5000);
    
    // Sistema de rating con estrellas
    $('.rating input').change(function() {
        var rating = $(this).val();
        var name = $(this).attr('name');
        console.log('Rating seleccionado para ' + name + ': ' + rating + ' estrellas');
    });
    
    // Efecto hover para tarjetas
    $('.flip-card').hover(
        function() {
            $(this).addClass('shadow-lg');
        },
        function() {
            $(this).removeClass('shadow-lg');
        }
    );
});

}

if ($('body').hasClass('pagina-precios')){

  
  $(document).ready(function () {
    // Activar tooltips Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));

    // Toggle de precios
    $('#togglePrecio').on('change', function () {
      const anual = $(this).is(':checked');
      $('.precio').each(function () {
        const precio = anual ? $(this).data('anual') : $(this).data('mensual');
        $(this).text(`$${precio}`);
      });
    });

    // Hover sobre filas y columnas
    $('#tablaPrecios td, #tablaPrecios th').hover(function () {
      const index = $(this).index();
      $(this).closest('table').find('tr').each(function () {
        $(this).find('td, th').eq(index).addClass('bg-danger text-white');
      });
      $(this).parent().addClass('bg-danger text-white');
    }, function () {
      $('#tablaPrecios td, #tablaPrecios th').removeClass('bg-danger text-white');
    });
  });
}

if ($('body').hasClass('pagina-blog')){

  AOS.init();

    // Filtro por tag
    $(".tag-btn").on("click", function () {
      const tag = $(this).data("tag");
      if (tag === "todo") {
        $(".article").show();
      } else {
        $(".article").hide().filter(`[data-tag="${tag}"]`).show();
      }
    });

    // Abrir modal con nombre del usuario
    let selectedUser = "";
    let targetComment = null;

    $(".reply-btn").on("click", function () {
      selectedUser = $(this).data("usuario");
      targetComment = $(this).closest(".comment");
      $("#usuarioModal").text(selectedUser);
      $("#replyModal").modal("show");
    });

    // Enviar respuesta y agregarla visualmente
    $("#replyForm").on("submit", function (e) {
      e.preventDefault();
      const respuesta = $(this).find("textarea").val().trim();
      if (respuesta !== "" && targetComment) {
        const contenedorRespuestas = targetComment.find(".replies");
        contenedorRespuestas.append(`<div class="reply"><strong>Vos:</strong> ${respuesta}</div>`);
      }
      $("#replyModal").modal("hide");
      $(this).find("textarea").val("");
    });
}
