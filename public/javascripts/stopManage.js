/**
 * Created by liuyuhang on 2016/4/20.
 */
define(function(){
    $(function() {
        $('#stops-data').on('click', function(event) {
            var target = event.target;
            if($(target).hasClass('prompt-toggle')){
                var stop = $(target).data('stop');
                $('#am-modal-prompt-desc').text(stop);
                $('#my-prompt').modal({
                    relatedTarget: this,
                    onConfirm: function(e) {
                        if(e.data){
                            $('#my-modal-loading').modal('open');
                            $.ajax({
                                url: '/stopmanage/stopmodify',
                                method: 'POST',
                                data:{
                                    oldStop: stop,
                                    newStop: e.data
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
