//xano class
export class Xanoapi{
    static #url = "https://x8ki-letl-twmt.n7.xano.io/api:JIBL7nZM/";
    static token ='';

    static async authcall(user, pass){
        try {
            const result = await axios.post(Xanoapi.#url+'auth/login', {email: user, password: pass});
            if (result.status == 200){
                return result.data.authToken;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    static returnheader() {
        return {
            headers: {
                'Authorization': `Bearer ${Xanoapi.token}` 
            }
        }
    }

    static async getuser(token) {
        Xanoapi.token=token;
        const result = await axios.get(
            Xanoapi.#url+'auth/me', 
            Xanoapi.returnheader()
        );
        if (result.status == 200) {
            return result.data;
        } else {
            Xanoapi.token = '';
            return false
        }
    }

    static async getsingletune(id) {
        const result= await axios.get(
            Xanoapi.#url+'tunes/'+id,
            Xanoapi.returnheader()
        );
        if (result.status == 200) {
            return result.data;
        } else {
            return false;
        }
    }

    static async getalltunes() {
        const result= await axios.get(
            Xanoapi.#url+'tunes',
            Xanoapi.returnheader()
        );
        if (result.status == 200) {
            return result.data;
        } else {
            return false;
        }
    }

    static async getalltunessearch() {
        const result= await axios.get(
            Xanoapi.#url+'reducedtunes',
            Xanoapi.returnheader()
        );
        if (result.status == 200) {
            return result.data;
        } else {
            return false;
        }
    }

    static async gettunebook() {
        const result= await axios.get(
            Xanoapi.#url+'tunebook',
            Xanoapi.returnheader()
        );
        if (result.status == 200) {
            return result.data;
        } else {
            return false;
        }
    }

    static async addtotunes(tune) {
        const result= await axios.post(
            Xanoapi.#url+'tunes',
            tune,
            Xanoapi.returnheader()
        );
        return result.status == 200 ? result.data : false;
    }

    static async deletetune(id) {
        const result= await axios.delete(
            Xanoapi.#url+'tunes/'+id,
            Xanoapi.returnheader()
        );
        return result.status == 200
    }

    static async deletetunebooktune(id) {
        const result= await axios.delete(
            Xanoapi.#url+'tunebook/'+id,
            Xanoapi.returnheader()
        );
        return result.status == 200
    }

    static async addtotunebook(tune) {
        const result= await axios.post(
            Xanoapi.#url+'tunebook',
            tune,
            Xanoapi.returnheader()
        );
        return result.status == 200 ? result.data : false;
    }

    static async edittune(id, tune) {
        const result= await axios.patch(
            Xanoapi.#url+'tunes/'+id,
            tune,
            Xanoapi.returnheader()
        );
        return result.status == 200 ? result.data : false;
    }

    static async edittunebooktune(id, tune) {
        const result= await axios.patch(
            Xanoapi.#url+'tunebook/'+id,
            tune,
            Xanoapi.returnheader()
        );
        return result.status == 200 ? result.data : false;
    }

    static async addvideo(video) {
        const result= await axios.post(
            Xanoapi.#url+'videos',
            video,
            Xanoapi.returnheader()
        );
        return result.status == 200 ? result.data : false;
    }

    static async getsecrets() {
        const result= await axios.get(
            Xanoapi.#url+'secrets',
            Xanoapi.returnheader()
        );
        return result.status == 200 ? result.data : false;
    }

}

// thesession class
export class thesession{
    static async search(searchstring) {
        let page=1;
        let asyncall = await this.singlesearch(searchstring, page);
        let result = asyncall.data.tunes;
        let pages = asyncall.data.pages;
        // limite pages if there are too many results
        pages = pages > 3 ? 3 : pages;
            while(page < pages){
                page++;
                asyncall = await this.singlesearch(searchstring, page);
                result = result.concat(asyncall.data.tunes);
            }
        return result;
    }

    static singlesearch(searchstring, page=1) {
        const url = `https://thesession.org/tunes/search?q=${searchstring}&format=json&page=${page}`;
        return axios.get(url);
    }

    static async gettune(tuneid) {
        const url = `https://thesession.org/tunes/${tuneid}?format=json`;
        const result = await axios.get(url);
        if (result.status == 200) {
            if (result.data.recordings > 0) {
                const recordings = await this.gettunerecordings(tuneid);
                result.data.recordings = recordings.data.recordings;
            }
            return result.data;
        }
        return false;
    }

    static async gettunerecordings(tuneid) {
        const url = `https://thesession.org/tunes/${tuneid}/recordings?format=json`;
        const result = await axios.get(url);
        return result;
    }

}

// pexels class
export class pexels{
    static #token;
    static #url = "https://api.pexels.com/v1/";

    static async search(searchstring, number=5) {
        let result =await axios.get(
            pexels.#url+'search?query='+searchstring+'&per_page='+number, 
            {headers: {
                'Authorization': pexels.#token 
            }
        });
        if (result.status == 200) {
            const photos = result.data.photos.map(pic => pic.src.large);
            return photos;
        } else {
            return false;
        }
    }

    static async initialize() {
        const secrets = await Xanoapi.getsecrets();
        const pexelsrecord = secrets.find(item => item.name == 'pexels');
        pexels.#token = pexelsrecord.value;
    }
}