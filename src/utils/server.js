import Vue from 'vue'
import axios from 'axios'
//解决axios请求发次都是不同session的问题
Vue.config.debug = true;
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

let PORTURl = "http://" + window.location.hostname + ":8080/";

const login = (name, password, event) => {
    let url = PORTURl + "user/login";
    let fm = new FormData();
    fm.append("name", name);
    fm.append("password", password);
    axios.post(url, fm).then(response => {
        event(response.data);
    })
}


const logout = (event) => {
    let url = PORTURl + "user/logout";
    axios.post(url).then(response => {
        event(response.data);
    })
}

const register = (name, age, title, phone, password, event) => {
    let url = PORTURl + "user/register";
    axios.post(url, {
        "name": name,
        "age": age,
        "title": title,
        "phone": phone,
        "password": password
    }).then(response => {
        event(response.data);
    })
}

const getUser = (name, event) => {
    let url = PORTURl + "user/get";
    axios.get(url, {
        params: {
            name: name
        }
    }).then(response => {
        event(response.data);
    })
}
const getUsers = (event) => {
    let url = PORTURl + "user/gets";
    axios.get(url).then(response => {
        event(response.data);
    })
}

const getUsersByExample = (id, name, age, title, phone, password, create_time, event) => {
    let url = PORTURl + "user/getByExample";
    axios.get(url, {
        params: {
            id: id,
            name: name,
            age: age,
            title: title,
            phone: phone,
            password: password,
            create_time: create_time
        }
    }).then(response => {
        event(response.data);
    })
}

const deleteUser = (id, event) => {
    let url = PORTURl + "user/delete";
    let fm = new FormData();
    fm.append("id", id);
    axios.post(url, fm).then(response => {
        event(response.data);
    })
}

const modifUser = (id, name, age, title, phone, password, event) => {
    let url = PORTURl + "user/modif";
    axios.post(url, {
        "id": id,
        "name": name,
        "age": age,
        "title": title,
        "phone": phone,
        "password": password
    }).then(response => {
        event(response.data);
    })
}
const getAllChoose = (event) => {
    let url = PORTURl + "/user/chooses";
    axios.get(url).then(response => {
        event(response.data);
    })
}

const getCourse = (id, name, hour, event) => {
    let url = PORTURl + "/courses";
    axios.get(url, {
        params: {
            id: id,
            name: name,
            hour: hour,
        }
    }).then(response => {
        event(response.data);
    })
}
const getCourseByUser = (id, event) => {
    let url = PORTURl + "/courses/" + id;
    axios.get(url, {
        params: {
            id: id
        }
    }).then(response => {
        event(response.data);
    })
}
const deleteCourse = (id, event) => {
    let url = PORTURl + "/courses/" + id;
    axios.delete(url).then(response => {
        event(response.data);
    })
}

const modifCourse = (id, name, hour, event) => {
    let url = PORTURl + "/courses/" + id;
    axios.put(url, {
        name: name,
        hour: hour

    }).then(response => {
        event(response.data);
    })
}

const addCourse = (name, hour, event) => {
    let url = PORTURl + "/courses";
    axios.post(url, {
        name: name,
        hour: hour

    }).then(response => {
        event(response.data);
    })
}
const addChapters = (name, courseId, event) => {
    let url = PORTURl + "/chapters";
    axios.post(url, {
        name: name,
        course: {
            id: courseId
        }

    }).then(response => {
        event(response.data);
    })
}
const getChapters = (id, event) => {
    let url = PORTURl + "/chapters/" + id;
    axios.get(url).then(response => {
        event(response.data);
    })
}
const deleteChapters = (id, event) => {
    let url = PORTURl + "/chapters/" + id;
    axios.delete(url).then(response => {
        event(response.data);
    })
}

const getItems = (id, event) => {
    let url = PORTURl + "/items/" + id;
    axios.get(url).then(response => {
        event(response.data);
    })
}

const getItemsByExample = (id, content, answer, type, selectSum, score, chapterId, event) => {
    let url = PORTURl + "/items";
    axios.get(url, {
        params: {
            id: id,
            content: content,
            answer: answer,
            type: type,
            selectSum: selectSum,
            score: score,
            chapterId: chapterId
        }
    }).then(response => {
        event(response.data);
    })
}
const addItem = (content, answer, type, score, chapterId, event) => {
    let url = PORTURl + "/items";
    axios.post(url, {
        content: content,
        answer: answer,
        type: type,
        score: score,
        chapter: {
            id: chapterId
        }

    }).then(response => {
        event(response.data);
    })
}
const deleteItem = (id, event) => {
    let url = PORTURl + "/items/" + id;
    axios.delete(url).then(response => {
        event(response.data);
    })
}

const modifItem = (id, content, answer, type, score, event) => {
    let url = PORTURl + "/items/" + id;
    axios.put(url, {
        content: content,
        answer: answer,
        type: type,
        score: score,

    }).then(response => {
        event(response.data);
    })
}
const getTypeSum = (chapters, event) => {
    let url = PORTURl + "/typeSum";
    axios.post(url, chapters).then(response => {
        event(response.data);
    })
}

const getTest = (chapters, types, sums, event) => {
    let url = PORTURl + "/Test";
    var typenames = [];
    for (var i = 0; i < types.length; i++) {
        typenames[i] = types[i].name;
    }
    axios.post(url, {
        chapterIdList: chapters,
        types: typenames,
        sums: sums,
    }).then(response => {
        event(response.data);
    })
}

export {
    login,
    register,
    getUser,
    getUsers,
    logout,
    getUsersByExample,
    deleteUser,
    modifUser,
    getAllChoose,
    getCourse,
    getCourseByUser,
    deleteCourse,
    modifCourse,
    addCourse,
    addChapters,
    getChapters,
    deleteChapters,
    getItems,
    getItemsByExample,
    addItem,
    deleteItem,
    modifItem,
    getTypeSum,
    getTest,
}