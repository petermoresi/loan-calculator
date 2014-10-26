
//(function() {
    
    function getDataSet() { 
        var output = {};
        var loanAmount = output.loanAmount = parseFloat( $('#loanAmount').val() );
        var interestRate = output.interestRate = parseFloat( $('#interestRate').val() );
        var paymentsPerYear = output.paymentsPerYear = parseInt( $('#paymentsPerYear').val() );
        var years = output.years = parseInt( $('#years').val() );
        var numberOfPayments = output.numberOfPayments = paymentsPerYear * years;
        
        var payment = output.payment = pmt(interestRate/100/paymentsPerYear, numberOfPayments, -loanAmount);
        
        output.schedule = computeSchedule( loanAmount,
                                           interestRate,
                                           paymentsPerYear,
                                           years,
                                           payment );
        return output;
    }
    

    function reloadTable(ds) {
        // map the schedule to 2 digits after decimal point.
        var schedule = ds.schedule.map( function(n) { 
            return [n[0], n[1].toFixed(2), n[2].toFixed(2), n[3].toFixed(2)];
        });
    
        $('#schedule').empty();
        $('#schedule').html( '<table cellpadding="0" cellspacing="0" border="0" class="display table" id="schedule_table"></table>' );
        $('#schedule_table').dataTable( {
            "data": schedule,
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

    function reloadGraph(ds) {
        var graphWidth = $('.table').width() // make graph same width as table
        var graphHeight = $('#graph').height();
        var periodWidth = Math.round(graphWidth / (ds.numberOfPayments));
    
        // adjust graphy width for rounding of period width
        graphWidth = periodWidth * ds.numberOfPayments;
    
        $('#graph').empty();
        $('#graph').width(graphWidth);
    
        for (var count = 0; count < ds.numberOfPayments; count++) {
            var i = ds.schedule[count][1];
            var p = ds.schedule[count][2];
            var t = i + p;
            var ratio = i / t;
            var height = graphHeight * ratio;
            $('<div style="background-color: yellow; height: ' + height + 'px; width: ' + periodWidth + 'px"></div>').appendTo('#graph');
        }
    }
        
    function reload() {
        var ds = getDataSet();
    
        $('#paymentAmount').text('$' + ds.payment.toFixed(2));
        reloadTable(ds);
        reloadGraph(ds);
    }
    
    
    $(document).on('keyup', '.user-input', reload);
    
    $(document).ready(function() {
        reload();
    });

//})();
