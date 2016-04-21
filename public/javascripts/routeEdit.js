/**
 * Created by liuyuhang on 2016/4/20.
 */
require(['stopManage'], function(){
    $(function() {
        $('#stops-data').on('click', function(event) {
            var target = event.target;
            if($(target).hasClass('prompt-toggle-order')){
                var route = $(target).data('route');
                var stop = $(target).data('stop');
                var order = $(target).data('order');
                $('#am-modal-prompt-order').text(order);
                $('#my-prompt-order').modal({
                    relatedTarget: this,
                    onConfirm: function(e) {
                        if(e.data){
                            $('#my-modal-loading').modal('open');
                            $.ajax({
                                url: '/stopmanage/stoporder',
                                method: 'POST',
                                data:{
                                    route: route,
                                    stop: stop,
                                    oldOrder: order,
                                    newOrder: e.data
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
                        if(e.data[0] && e.data[1]){
                            $('#my-modal-loading').modal('open');
                            $.ajax({
                                url: '/routemanage/routestopadd',
                                method: 'POST',
                                data:{
                                    route: routeName,
                                    stop: e.data[0],
                                    order: e.data[1]
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

});