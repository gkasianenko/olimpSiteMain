/**
 * Created by Echo-company
 * http://www.echo-company.ru
 *
 */
var security__echocompany;

(function ($) {

    function SecurityEchoCompany() {
        var that = this;

        var ajaxErrorCounter = 1;
        var maxAjaxErrors = 5;

        var security__count_files = 0;
        var security__full_scan = 0;

        $(document).ready(function() {

            security__count_files = $('.b-security__count_files').text();
            security__full_scan = $('.b-security__full').is(':checked') ? 1 : 0;

            $('.s-security__start').click(function (e) {
                e.preventDefault();

                if ($('.b-security__full').is(':checked')) {
                    if (!confirm('Полное сканирование займет много времени, Вы согласны?')) {
                        return;
                    }
                    security__full_scan = 1;
                } else {
                    security__full_scan = 0;
                }

                that.prepareScan();
            });

            $('.s-security__get_filelist').click(function(e){
                e.preventDefault();
                $(this).closest('.b-security__danger_parent').find('.b-security__danger_filelist').show();
            })

            $('.b-security__cancel').click(function (e) {
                e.preventDefault();

                if (confirm('Прервать текущее сканирование?')) {
                    $(this).attr("disabled", 'disabled');

                    that.sendRequest("?action=cancel", function () {
                        $(window).off('beforeunload');
                        window.location.reload();
                    })
                }
            });

            if ($('.b-security_do-start').val()==1){
                that.prepareScan();
            };

            $(document).on('click','.b-security__found_more',function(e){
                e.preventDefault();
                $(this).closest('.b-security__found').find('.b-security__found_detail').stop(false, false).slideToggle();
            })

            setInterval(function(){
                var text = $('.b-security__psets').text()+".";
                if (text=="....") {text = "";}
                $('.b-security__psets').text(text);
            },500);
        });

        that.prepareScan = function (){
            $('.b-security__start_block').hide();
            $('.b-security__process').show();


            $(window).on('beforeunload', function(e){
                var message = 'Если вы уйдете с данной страницы, сканирование будут приостановлено';
                e.returnValue = message;
                return message;
            });

            that.sendRequest("?action=start&full_scan="+security__full_scan, that.doStart);
        }

        that.doStart = function () {
            $('.b-security__status_text').html('Составление списка файлов');
            $('.b-security__filelist').show();
            that.sendRequest("?action=getlist", that.doFileList);
        }

        that.doFileList = function (response) {

            if (response.meta.status == 'inProcess') {
                $('.b-security__filelist_count').text(response.meta.count_files);

                if (response.meta.count_known>0){
                    $('.b-security__known').show();
                    $('.b-security__count_known').text(response.meta.count_known);
                }

                that.sendRequest("?action=getlist", that.doFileList);

            } else if (response.meta.status == 'finished') {

                $('.b-security__count_files').text(response.meta.count_files);

                $('.b-security__filelist').hide();
                $('.b-security__status_text').html('Проверка файлов');
                $('.b-security__scanner').show();

                that.sendRequest("?action=process", that.doScan);

            }
        }


        that.doScan = function (response) {

            if (response.status == 'inProcess') {
                $('.b-security__lastfile').text(response.last_file);

                security__count_files = parseInt(response.count_files);
                var security__count_scan = parseInt(response.count_scan);

                var security__progress  = security__count_scan * 100 / security__count_files;

                $('.b-security__progressbar_inner').css('width', Math.round(security__progress) + '%');
                $('#files_found').text(security__count_scan);
                $('#files_total').text(security__count_files);

                that.sendRequest("?action=process", that.doScan);

            } else if (response.status == 'finished') {

                $('.b-security__status_text').html('Завершение сканирования');
                $('.b-security__scanner').hide();

                that.sendRequest("?action=complete", function(data){
                    $(window).off('beforeunload');
                    window.location.href = data;
                });
            }
        }

        that.sendRequest = function (url, handleResponse) {

            $.getJSON(url, function(responseJSON) {

                if (responseJSON && responseJSON.status=="ok"){
                    ajaxErrorCounter=0;
                    if (responseJSON.data.found){
                        that.pushFound(responseJSON.data.found);
                    }

                    handleResponse(responseJSON.data);

                }else{
                    if (!responseJSON){
                        that.addWarning('Неизвестная ошибка. Сервер не вернул результат', url, handleResponse);
                    }else if (responseJSON.status=="fail"){
                        that.addWarning(responseJSON.errors, url, handleResponse)
                    }else{
                        that.addWarning(responseJSON, url, handleResponse)
                    }
                }
            })
             .fail(function(response) {
                 if (response.responseText){

                     if (response.responseText.indexOf('Maximum execution time of')!=-1){
                         that.addWarning('Превышено время выполнения скриптов, увеличьте  <strong>max_execution_time</strong> на вашем сервере', url, handleResponse);
                     }else {
                         $('.b-security__error_text').html('Сканирование остановлено, ошибка сервера:' + '<br>' + response.responseText);
                         $('.b-security__error').slideDown();
                     }
                 }else{
                     $('.b-security__warning').slideDown();
                     that.addWarning('Неизвестная ошибка. Сервер не вернул результат', url, handleResponse);
                 }
             })
        }


        that.addWarning = function (text, url, handleResponse){

            $('.b-security__warning_text').append(text);
            $('.b-security__warning').slideDown();

            ajaxErrorCounter++;

            if (ajaxErrorCounter <= maxAjaxErrors) {

                $('.b-security__warning_text').append(' [повторная попытка через '+ajaxErrorCounter+' сек]<br>')

                setTimeout(function() {that.sendRequest(url, handleResponse);}, ajaxErrorCounter * 1000);

            } else {

                $('.b-security__error_text').html('Сканирование остановлено, слишком много ошибок');
                $('.b-security__error').slideDown();
                //TODO:: повторная отправка?
            }
        }

        that.pushFound = function (founds){
            $('.b-security__founds_block').prepend(founds);
        };

    }

    //Store global object
    security__echocompany = new SecurityEchoCompany();

})(jQuery);