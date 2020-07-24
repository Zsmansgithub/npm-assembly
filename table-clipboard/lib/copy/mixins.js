import Vue from 'vue/dist/vue.esm.js';
import menus from './menus';
import './style.css'
export default {
    data () {
        return {
            instance: undefined,
            clipContent: undefined
        };
    },
    methods: {
        clipInit (clipContent) {
            if (!(window.Node && clipContent instanceof Node)) return;
            this.clipContent = clipContent;
            this.$nextTick(() => {
                document.onselectstart = function (event) {
                    event.returnValue = false;
                };
            });
            const Profile = Vue.extend(menus);
            // 创建 Profile 实例，并挂载到一个元素上。
            this.instance = new Profile({
                propsData: {
                    sty: {
                        left: '0px',
                        top: '0px'
                    },
                    copyCode: this.copyCode,
                    isShow: false}
            }).$mount();
            document.body.appendChild(this.instance.$el);
            document.addEventListener('keydown', this.doCopy);
            this.$once('hook:beforeDestroy', () => {
                document.removeEventListener('keydown', this.doCopy);
            });
        },
        doCopy (e) {
            if (e.keyCode === 67 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                this.copyCode();
            }
        },
        clickDown ($event) {
            let rangeStartX, rangeSEndX, rangeStartY, rangeEndY;
            this.instance._props.isShow = false;
            const startX = $event.pageX;
            const startY = $event.pageY;
            const td = Array.from(this.clipContent.querySelectorAll('td'));
            this.clipContent.onmousemove = ($event) => {
                [rangeStartX, rangeSEndX] = [startX, $event.pageX].sort((a, b) => { return a - b; });
                [rangeStartY, rangeEndY] = [startY, $event.pageY].sort((a, b) => { return a - b; });
                td.map(v => {
                    const tdItemL = v.getBoundingClientRect().left + window.pageXOffset;
                    const tdItemR = v.getBoundingClientRect().right + window.pageXOffset;
                    const tdItemT = v.getBoundingClientRect().top + window.pageYOffset;
                    const tdItemB = v.getBoundingClientRect().bottom + window.pageYOffset;
                    const isinnerX = (rangeStartX < tdItemL && tdItemL < rangeSEndX) || (rangeStartX < tdItemR && tdItemR < rangeSEndX); // td左右边X轴坐标是否在滑动起始点X轴坐标内
                    const isinnerY = (rangeStartY < tdItemT && tdItemT < rangeEndY) || (rangeStartY < tdItemB && tdItemB < rangeEndY);// td上下边Y轴坐标是否在滑动起始点Y轴坐标内
                    const level = (tdItemL < rangeStartX && rangeStartX < tdItemR) || (tdItemL < rangeSEndX && rangeSEndX < tdItemR); // 滑动起始点X轴坐标是否在td左右边X轴坐标内
                    const vertical = (tdItemT < rangeStartY && rangeStartY < tdItemB) || (tdItemT < rangeEndY && rangeEndY < tdItemB); // 滑动起始点Y轴坐标是否在td上下边Y轴坐标内
                    if ((isinnerX && isinnerY) || (vertical && isinnerX) || (level && isinnerY)) {
                        v.classList.add('checkClips');
                    } else {
                        v.classList.remove('checkClips');
                    }
                });
            };
        },
        clickUp ($event, ref) {
            this.clipContent.onmousemove = undefined;
        },
        copyCode () {
            const text = Array.from(this.clipContent.querySelectorAll('.checkClips'))
                .reduce((Str, v) => {
                    Str += v.innerText + '\n';
                    return Str;
                }, '');
            if (!text) {
                this.instance._props.isShow = false;
                return;
            }
            this.$copyText(text).then(
                (res) => {
                    this.$message.success('复制成功');
                    this.instance._props.isShow = false;
                    Array.from(this.clipContent.querySelectorAll('.checkClips'))
                        .map((v) => {
                            v.classList.remove('checkClips');
                        });
                },
                (e) => {
                    this.$message.error('复制失败');
                }
            );
        },
        showMenu ($event) {
            let left = $event.pageX;
            console.log(window.pageXOffset);
            console.log(window.innerWidth);
            console.log($event.pageX);
            if (window.innerWidth + window.pageXOffset - left < 60) {
                left = left - 54;
            }
            let top = $event.pageY;
            if (window.innerHeight + window.pageYOffset - top < 50) {
                top = top - 33;
            }
            this.instance._props.sty = {
                left: left + 'px',
                top: top + 'px'
            };
            this.instance._props.isShow = true;
        }
    }
};
