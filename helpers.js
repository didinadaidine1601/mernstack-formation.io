
/**
 * function de haut niveau appelé HOF(hight order function)
 * c'est une function qui va etre parent des autre et qui va remplacé les try et catch
 * avantage:
 * -gestion d'erreur plus facile
 * -offre une visibilité de code
 * - s'emploi avec les fonction asyncrone
 * req la requette
 * res le resultat 
 * next permet de passé a la function suivant puisque
 *  expresse fonctionne avec des notion d'hierarchique
 */
export const catcherrors=fn=>(req,res,next)=>{
    return fn(req,res,next).catch(next)
}