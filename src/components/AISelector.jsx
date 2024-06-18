/* eslint-disable react/prop-types */
import {AIModels} from "../constants/AIModels"
import "./styles/AISelector.css"

export const AISelector = ({setAIModel}) => {

    const handleChange = (event) => {
        setAIModel(event.target.value)
    }

    return (
        <select onChange={handleChange} className="AISelector" name="" id="">
            {AIModels.map(model => (
                <option key={model.model_id} value={model.model_id}>{model.name} {(model.vram_required_MB/1000).toFixed(1)}GB | {model.low_resource_required ? 'HQ' : 'LQ'}</option>
            ))}
        </select>
    )
}