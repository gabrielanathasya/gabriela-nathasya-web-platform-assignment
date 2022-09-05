import { baseUrl } from "./api"
import { HttpClient } from "./httpClient"
import { baseService } from "./baseService"
import { profileHTTPService } from "./profileService"
import { CVHTTPService } from "./cvService"

const httpClient = HttpClient(baseUrl)
const baseServiceFunc = baseService(httpClient)

const profileService = profileHTTPService(baseServiceFunc)
const cvService = CVHTTPService(baseServiceFunc)

export { profileService, cvService }
