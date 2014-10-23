
(function() {
    
    function getDataSet() { 
        var output = {};
        output.loan_amount = parseFloat( $('#loan_amount').val() );
        output.interest_rate = parseFloat( $('#interest_rate').val() );
        output.payments_per_year = parseInt( $('#payments_per_year').val() );
        output.years = parseInt( $('#years').val() );
        
        output.payment = pmt(interest_rate/100/payments_per_year, payments_per_year * years, -loan_amount);
        
        output.schedule = compute_schedule( output.loan_amount,
                                            output.interest_rate,
                                            output.payments_per_year,
                                            output.years,
                                            output.payment );
    
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
