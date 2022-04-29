// api文件夹下各个请求模块js
import { recommendMusic, newMusic } from '@/api/Home'
import { hotSearch, searchList } from '@/api/Search'
import { getSongById, getLyricById } from '@/api/Play'
export const recommendMusicAPI = recommendMusic
export const newMusicAPI = newMusic

export const hotSearchAPI = hotSearch
export const searchListAPI = searchList

export const getSongById = searchList
export const getLyricById = searchList