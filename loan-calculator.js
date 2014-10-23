
(function() {
    
    function getDataSet() { 
        var loan_amount = parseFloat( $('#loan_amount').val() );
        var interest_rate = parseFloat( $('#interest_rate').val() );
        var payments_per_year = parseInt( $('#payments_per_year').val() );
        var years = parseInt( $('#years').val() );
        
        var payment = pmt(interest_rate/100/payments_per_year, payments_per_year * years, -loan_amount);
        
        $('#payment_amount').text('$' + payment.toFixed(2));
        
        return compute_schedule(loan_amount,
                                interest_rate,
                                payments_per_year,
                                years,
                                payment);
    }

    function reloadGraph() {
        
    }


    function reloadGraph(dataSet) {
        
    }
    
    function reloadTable(dataSet) {
        $('#schedule').empty();
        $('#schedule').html( '<table cellpadding="0" cellspacing="0" border="0" class="display table" id="schedule_table"></table>' );
        $('#schedule_table').dataTable( {
            "data": dataSet),
            "searching": false,
            "columns": [
                { "title": "Period" },
                { "title": "Principle" },
                { "title": "Interest" },
                { "title": "Remaining" }
            ],
            "search": false,
            "paging":   false,
            "ordering": false,
            "info":     false
        } );   
    }
    
    $(document).ready(function() {
        reloadTable();
        
        $(document).on('keyup', '.user-input', function(e) {
            var ds = getDataSet();
            reloadTable(ds);
            reloadGraph(ds);
        });
    });


})();
