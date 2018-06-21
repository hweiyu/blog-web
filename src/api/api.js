import axios from 'axios'
import {Message } from 'element-ui'
import router from '../router/route'

let base = process.env.API_ROOT;
//响应时间
axios.defaults.timeout = 60*1000;

function getUserToken() {
    let user = sessionStorage.getItem('user');
    let userToken = "";
    if (user) {
        user = JSON.parse(user);
        userToken = user.token || '';
    }
    return userToken;
}

axios.interceptors.request.use(
    config => {
        config.headers['x-access-token'] = getUserToken();
        config.headers['x-access-type'] = 'web';
        return config;
    },
    err => {
        return Promise.reject(err)
    });


axios.interceptors.response.use((res) =>{
    if(res.status !== 200){
        Message.error({
            message: "请求错误" + " : " + res.status
        });
        return Promise.reject(res);
    } else {
        processResponseData(res.data);
    }
    return res;

}, (error) => {
    let hintStr = "网络错误";
    if ((error) && (error.response) && (error.response.status)) {
        hintStr += ":" + error.response.status;
    }
    Message.error({
        message: hintStr
    });
    return Promise.reject(error);
});

export function getUploadImgUrl() {
    return process.env.API_ROOT + '/file/uploadImgNormal?token=' + getUserToken();
}




/**
 * 获取验证码地址
 */
export function getCaptchaUrl(uuid) {
    return process.env.API_ROOT + `/captcha?uuid=` + uuid;
}




export function processResponseData(data) {
    if (data.code === 3) { //授权失败
        sessionStorage.removeItem('user');
        router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
        })
    } else if (data.code === 2) { //错误
        Message.error(data.message);
    } else if (data.code === 4) { //验证失败
        let vaildStr = "";
        if ((data.data) && (data.data.fieldErrors)) {
            let fieldErrors = data.data.fieldErrors;
            fieldErrors.forEach(function(value,index,array) {
                vaildStr +=  ' ' + value.message;
            });
        }
        Message.error(vaildStr);
    } else if (data.code === 3) { //无权限
        Message.error("[" + data.data + "]无此操作权限");
    }
}

//用户登录退出
export const login = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const logout  = params => { return axios.post(`${base}/logout`, params).then(res => res.data); };


//博客内容
export const getById = params => { return axios.post(`${base}/blog/getById`,  params).then(res => res.data); };
export const getBlogList = params => { return axios.post(`${base}/blog/getBlogList`,  params).then(res => res.data); };
export const removeBlog = params => { return axios.post(`${base}/blog/remove`, params ).then(res => res.data); };
export const batchRemoveBlog = params => { return axios.post(`${base}/blog/batchRemove`, params ).then(res => res.data); };
export const editBlog = params => { return axios.post(`${base}/blog/edit`, params ).then(res => res.data); };
export const addBlog = params => { return axios.post(`${base}/blog/add`,  params ).then(res => res.data); };


//博客标签
export const getBlogTagsList = params => { return axios.post(`${base}/blogTags/list`,  params).then(res => res.data); };
export const removeBlogTags = params => { return axios.post(`${base}/blogTags/remove`, params ).then(res => res.data); };
export const batchRemoveBlogTags = params => { return axios.post(`${base}/blogTags/batchRemove`, params ).then(res => res.data); };
export const editBlogTags = params => { return axios.post(`${base}/blogTags/edit`, params ).then(res => res.data); };
export const addBlogTags = params => { return axios.post(`${base}/blogTags/add`,  params ).then(res => res.data); };
export const getTagList  = params => { return axios.post(`${base}/blogTags/getTagList`,  params ).then(res => res.data); };
