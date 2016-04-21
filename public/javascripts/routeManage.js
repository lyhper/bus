/**
 * Created by liuyuhang on 2016/4/21.
 */
$(function() {
    $('#routes-data').on('click', function(event) {
        var target = event.target;
        if($(target).hasClass('prompt-toggle')){
            var route = $(target).data('route');
            $('#am-modal-prompt-desc').text(route);
            $('#my-prompt').modal({
                relatedTarget: this,
                onConfirm: function(e) {
                    if(e.data){
                        $('#my-modal-loading').modal('open');
                        $.ajax({
                            url: 'routemanage/routemodify',
                            method: 'POST',
                            data:{
                                oldRoute: route,
                                newRoute: e.data
                            }
                        }).done(function(){
                            $('#my-modal-loading').modal('close');
                            location.reload();
                        }).fail(function(){
                            $('#my-modal-loading').modal('close');
                            alert('提交失败！');
                        });
                    }else{
                        alert('不能为空！');
                    }
                }
            });
        }

        if($(target).hasClass('prompt-toggle-add')){
            $('#my-prompt-add').modal({
                relatedTarget: this,
                onConfirm: function(e) {
                    if(e.data){
                        $('#my-modal-loading').modal('open');
                        $.ajax({
                            url: 'routemanage/routeadd',
                            method: 'POST',
                            data:{
                                route: e.data
                            }
                        }).done(function(){
                            $('#my-modal-loading').modal('close');
                            location.reload();
                        }).fail(function(){
                            $('#my-modal-loading').modal('close');
                            alert('提交失败！');
                        });
                    }else{
                        alert('不能为空！');
                    }
                }
            });
        }
    });
});
