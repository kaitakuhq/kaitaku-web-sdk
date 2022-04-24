
import humps from 'humps'

// snakeToCamel converts REST API's snake case variables like owner_id to JS standard came case variables like ownerId
export const snakeToCamel = (obj: object) => humps.camelizeKeys(obj)
