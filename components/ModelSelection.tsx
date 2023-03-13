'use client'
import useSWR from 'swr'
import Select from 'react-select'

const fetchModels = () => fetch('/api/getEngines').then(res => res.json())

function ModelSelection() {

    const { data: models, isLoading, error } = useSWR('/api/getEngines', fetchModels)
    const { data: model, mutate: setModel } = useSWR('model', {
        fallbackData: "gpt-3.5-turbo",
    })

  return (
    <div className='my-2 xs:mx-2 xs:divide-y xs:divide-gray-300'>
        <span className='xs:hidden'></span>
        <div>
            <p className="mt-2 text-gray-300 text-sm">Select model:</p>
            <Select
                className='mt-2'
                onChange={(e) => setModel(e.value)}
                options={models?.modelOptions}
                defaultValue={model}
                placeholder={model}
                isSearchable
                isLoading={isLoading}
                menuPosition="fixed"
                classNames={{
                    control: (state) => "bg-[#434654] border--[#434654]"
                }}
            />
        </div>
        
    </div>
  )
}

export default ModelSelection