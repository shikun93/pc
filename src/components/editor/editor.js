/**
 * Created by Administrator on 2017/4/17.
 */
import React from 'react';
import './editor.less';
//组件类
class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onchange(){}
    componentDidMount(){
        let t =this;
        function kedit(kedit){
            var aeditor = KindEditor.create(kedit,{
                uploadJson : t.props.url,
                data:t.props.data,
                width:t.props.width,
                height:t.props.height,
                urlType:'domain',
                resizeMode: 0,
                afterBlur:function(){
                    t.props.editorHtml(aeditor.html());
                },
                items: t.props.items
            });
        }

        $(function(){
            kedit('textarea[name="content"]');
        })
    }

    render() {
        let t = this;
        return (
            <textarea id="uppics" name="content" style={{"visibility":"hidden"}} value={t.props.editorsValue?t.props.editorsValue:""} onChange={t.onchange}></textarea>
    );
    }
}

module.exports = Editor;
