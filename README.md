# whatGame
A simple video game catalog.
Created using Node.js, Express, Pug and Bootstrap.

Catalog information is retrieved from a single `manifest.json` file.
Images are stored in the `~/public/iamges/` directory.

## APIs
Comes with several APIs:

  - listAll
  - idList
  - specificGame
  
### listAll
Returns a list of all games and its respective details as a JSON object.

        GET /api/all
        
 ### idList
Returns a list of IDs of all games as a JSON object.

        GET /api/id_list       
        
 ### specificGame
Returns information on a specific game based on the `id` given as a parameter.

        GET /api/game/<ID> 
