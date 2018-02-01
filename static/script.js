var mobileNumbers = [
  {number: 8122195911, score: 0, result: 'done'},
  {number: 8122195912, score: 0, result: 'done'},
  {number: 9940831648, score: 0, result: 'done'},
  {number: 9940831649, score: 0, result: 'done'},
  {number: 9940831645, score: 0, result: 'done'}
  ]  
$(document).ready(function(){
  addTableRows(mobileNumbers);
})


function addTableRows(Rows) {
  var row = Rows.map(function(obj, index){
    var singleRow = $(`
    <tr id="${'row'+obj.number}" class="${obj.result == 'done' ? 'sucess-row' : 'table-danger'}">
      <td>${index+1}</td>
      <td>${obj.number}</td>
      <td class="score">${obj.score}</td>
      <td id="${'cell'+obj.number}">${obj.result == 'done' ? '<i class="fas fa-check-square"></i>' : '<i class="fas fa-minus-square"></i>'}</td>
    </tr>
    `);
    return singleRow;
  })
  
  $('#tbody').append(row);
}

function updateRowStatus(number, score, status){
  $('#row'+number+' .score').html(score);
  if(status == "success") {
    $('#row'+number).removeClass('table-danger');
    $('#row'+number).addClass('success-row');
    $('#cell'+number).html('<i class="fas fa-check-square"></i>');
  }else{
    $('#row'+number).addClass('table-danger');
    $('#row'+number).removeClass('success-row');
    $('#cell'+number).html('<i class="fas fa-minus-square"></i>');
  }
}