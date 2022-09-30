<template>
    <div>
        <div class="gaojin">
            <div class="box">建议告警级别：</div>
            <div class="box critical"></div>
            <div class="box serious"></div>
            <div class="box warning"></div>
            <div class="box info"></div>
        </div>
        <div>系统需要提供监控中心(iShow中的工程中心,提供告警总数、按告警级别分类汇总, 按监控对象分类汇总,以卡片的形式展示出来)</div>
        <div>监控列表(展示监控对象下各个监控指标的状态详情)</div>
        <div>定制化监控告警(拖拉拽实现定制化页面中监控对象指标的展示)</div>
        <div>监控对象、设备、用户、权限组、时段、对象组、接警组、策略(告警屏蔽、告警压缩)等元数据的增删改查</div>
        <div>历史数据、历史事件、操作日志的展示</div>
        <div>个人操作(密码修改、主题切换、语言切换，退出等)</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .gaojin {
        display: flex;
        flex-flow: row;
        margin: 10px 0;
    }
    .box:nth-child(1) {
        width: auto;
    }
    .box {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .box + .box {
        margin-left: 15px;
    }
    .critical {
        background: #c0392b;
    }
    .critical::after {
        content: '紧急';
    }
    .serious {
        background: #d35400;
    }
    .serious::after {
        content: '严重';
    }
    .warning {
        background: #f39c12;
    }
    .warning::after {
        content: '警告';
    }
    .info {
        background: #2980b9;
    }
    .info::after {
        content: '信息';
    }
    ul {
        list-style-type: none;
    }
</style>