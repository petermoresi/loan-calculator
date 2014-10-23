
(function() {
    
    function getDataSet() { 
        var output = {};
        var loan_amount = output.loan_amount = parseFloat( $('#loan_amount').val() );
        var interest_rate = output.interest_rate = parseFloat( $('#interest_rate').val() );
        var payments_per_year = output.payments_per_year = parseInt( $('#payments_per_year').val() );
        var years = output.years = parseInt( $('#years').val() );
        
        var payment = output.payment = pmt(interest_rate/100/payments_per_year, payments_per_year * years, -loan_amount);
        
        output.schedule = compute_schedule( loan_amount,
                                            interest_rate,
                                            payments_per_year,
                                            years,
                                            payment );
    
        return output;
    }
    

    function reloadTable(ds) {
        $('#schedule').empty();
        $('#schedule').html( '<table cellpadding="0" cellspacing="0" border="0" class="display table" id="schedule_table"></table>' );
        $('#schedule_table').dataTable( {
            "data": ds.schedule,
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

    function reloadGraph(dataSet) {
        
    }
        
    function reload() {
        var ds = getDataSet();
    
        $('#payment_amount').text('$' + ds.payment.toFixed(2));
        reloadTable(ds);
        reloadGraph(ds);
    }
    
    
    $(document).on('keyup', '.user-input', reload);
    
    $(document).ready(function() {
        reload();
    });

})();
