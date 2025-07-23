import { generateImageAction } from '@/app/actions/image-actions';
import { ImageGeneratorFormSchema } from '@/components/image-generation/Configurations';
import {z} from 'zod';
import { create } from 'zustand'

interface GeneratedStore{
    loading:boolean;
    images: Array<{url:string}>,
    error: string | null;
}

const useGeneratedStore = create((set) => ({
loading:false,
images: [],
error: null,

generateImage: async(values: z.infer<typeof ImageGeneratorFormSchema>) =>{
    set({loading:true, error:null})   
    try{
      const {error, success, data} =  await generateImageAction(values)
      if(!success){
        set({loading:false, error:error})
        return
      }
      set({images:data, loading:false})
    }catch(error:any){
        console.error(error)
        set({loading:false, error:"failed to generate, image please try again"})
    }
}

}))

export default useGeneratedStore
