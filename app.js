// ******************************************************************** 
function mostrarVista(vista) {
  // Ocultar todas las vistas
  var vistas = document.getElementsByClassName('vista');
  for (var i = 0; i < vistas.length; i++) {
    vistas[i].style.display = 'none';
  }

  // Mostrar la vista seleccionada
  document.getElementById(vista).style.display = 'block';
}



// ***************************************************************** 

function guardarDinero() {
  var dineroIngresado = parseFloat(document.getElementById('dinero').value);
  var gastos = parseFloat(localStorage.getItem('gastos')) || 0;
  var ahorro = parseFloat(localStorage.getItem('ahorro')) || 0;
  var diversion = parseFloat(localStorage.getItem('diversion')) || 0;

  var totalGastos = gastos + (dineroIngresado * 0.5);
  var totalAhorro = ahorro + (dineroIngresado * 0.3);
  var totalDiversion = diversion + (dineroIngresado * 0.2);

  // Guardar los montos en el almacenamiento local
  localStorage.setItem('gastos', totalGastos);
  localStorage.setItem('ahorro', totalAhorro);
  localStorage.setItem('diversion', totalDiversion);

  actualizarSaldo();
  guardarMovimiento('Ingreso', dineroIngresado, 'Ingreso de dinero general');
  alert('Dinero guardado exitosamente.');

  location.reload();//refrezca o actualiza la pagina ctv
}

function realizarMovimiento() {
  var tipoMovimiento = document.getElementById('tipo-movimiento').value;
  var parte = document.getElementById('parte').value;
  var cantidadMovimiento = parseFloat(document.getElementById('cantidad-movimiento').value);
  var motivoMovimiento = document.getElementById('motivo-movimiento').value;

  // Obtener el monto correspondiente desde el almacenamiento local
  var monto = parseFloat(localStorage.getItem(parte)) || 0;

  if (tipoMovimiento === 'deposito') {
    var total = monto + cantidadMovimiento;
    localStorage.setItem(parte, total);
    guardarMovimiento('Depósito', cantidadMovimiento, motivoMovimiento);
    alert('Se realizó un depósito de ' + cantidadMovimiento + ' en ' + parte);
  } else if (tipoMovimiento === 'retiro') {
    if (cantidadMovimiento <= monto) {
      var total = monto - cantidadMovimiento;
      localStorage.setItem(parte, total);
      guardarMovimiento('Retiro', cantidadMovimiento, motivoMovimiento);
      alert('Se realizó un retiro de ' + cantidadMovimiento + ' en ' + parte);
    } else {
      alert('No tienes suficientes fondos en ' + parte);
    }
  }

  actualizarSaldo();
  location.reload();//refezca o actualiza la pagina ctv
}

function guardarMovimiento(tipo, cantidad, motivo) {
  var fechaHora = new Date();
  var movimiento = {
    tipo: tipo,
    cantidad: cantidad,
    motivo: motivo,
    fecha: fechaHora.toLocaleDateString(),
    hora: fechaHora.toLocaleTimeString()
  };

  var movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
  movimientos.push(movimiento);
  localStorage.setItem('movimientos', JSON.stringify(movimientos));
}

function verReporteMovimientos() {
  var movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];

  var reporte = 'Reporte de Movimientos:\n\n';
  for (var i = 0; i < movimientos.length; i++) {
    var movimiento = movimientos[i];
    reporte += 'Tipo: ' + movimiento.tipo + '\n';
    reporte += 'Cantidad: ' + movimiento.cantidad + '\n';
    reporte += 'Motivo: ' + movimiento.motivo + '\n';
    reporte += 'Fecha: ' + movimiento.fecha + '\n';
    reporte += 'Hora: ' + movimiento.hora + '\n\n';
  }

  alert(reporte);
}

function actualizarSaldo() {
  var saldoGastos = parseFloat(localStorage.getItem('gastos')) || 0;
  var saldoAhorro = parseFloat(localStorage.getItem('ahorro')) || 0;
  var saldoDiversion = parseFloat(localStorage.getItem('diversion')) || 0;

  document.getElementById('saldo-gastos').textContent = saldoGastos.toFixed(2);
  document.getElementById('saldo-ahorro').textContent = saldoAhorro.toFixed(2);
  document.getElementById('saldo-diversion').textContent = saldoDiversion.toFixed(2);
}

actualizarSaldo();  
    

    function resetStorage() {
      var password = prompt("Por favor, ingresa la contraseña para reiniciar el almacenamiento:");
      
      // Verifica si la contraseña ingresada es correcta
      if (password === "0648") {
        // Resetea el almacenamiento o realiza la acción deseada
        localStorage.clear(); // Ejemplo: se utiliza localStorage.clear() para borrar todo el almacenamiento local
        alert("El almacenamiento se ha reiniciado correctamente.");
      } else {
        alert("Contraseña incorrecta. No se pudo reiniciar el almacenamiento.");

        
      }
      location.reload();
    }