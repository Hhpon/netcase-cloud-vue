import { getLyric } from 'api/song'
import { ERR_OK } from 'common/js/config'

export default class Song {
    constructor({ singer, alId, alPicUrl, alName, alia, songName, songId }) {
        this.singer = singer
        this.alId = alId
        this.alPicUrl = alPicUrl
        this.alName = alName
        this.alia = alia
        this.songName = songName
        this.songId = songId
    }

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }

        return new Promise((resolve, reject) => {
            getLyric(this.songId).then((res) => {
                if (res.data.code === ERR_OK) {
                    this.lyric = res.data.lrc.lyric
                    resolve(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })
    }
}

export function createSong(musicData) {
    return new Song({
        singer: filterSinger(musicData.ar),
        alId: musicData.al.id,
        alPicUrl: musicData.al.picUrl,
        alName: musicData.al.name,
        alia: filterAlia(musicData.alia),
        songName: musicData.name,
        songId: musicData.privilege.id
    })
}

function filterSinger(ar) {
    let ret = []
    if (!ar) {
        return ''
    }
    ar.forEach(arItem => {
        ret.push(arItem.name)
    });
    return ret.join('/')
}

function filterAlia(alia) {
    let ret = []
    if (!alia) {
        return ''
    }
    alia.forEach(element => {
        ret.push(element)
    });
    return ret.join('/')
}