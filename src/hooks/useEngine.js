import { useEffect, useState } from "react"
import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm"
export const useEngine = (AIModel) => {
    const [engine, setEngine] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadState, setLoadState] = useState('')
    const [disableBtn, setDisableBtn] = useState(true)

     useEffect(() => {
       setLoading(true)
       setDisableBtn(true)

         const initializeEngine = async () => {
           const engine = await CreateWebWorkerMLCEngine(
             new Worker('src/service/worker.js', { type: 'module' }),
             AIModel,
             {
               initProgressCallback: (info) => {
                 setLoadState(info.text)
                 if (info.progress === 1) {
                   setLoading(false)
                   setDisableBtn(false)
                 }
               }
             }
           )
           setEngine(engine)
         }
         console.log(AIModel)
         initializeEngine()
       }, [AIModel])

    return {engine, loading, loadState, disableBtn:[disableBtn, setDisableBtn]}
}