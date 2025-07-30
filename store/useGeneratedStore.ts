import { generateImageAction, storeImages } from '@/app/actions/image-actions';
import { ImageGeneratorFormSchema } from '@/components/image-generation/Configurations';
import {z} from 'zod';
import { create } from 'zustand'
import { toast } from 'sonner';

interface GeneratedState{
    loading:boolean;
    images: Array<{url:string}>,
    error: string | null;
    generateImage: (values: z.infer<typeof ImageGeneratorFormSchema>) => Promise<void>;
}

const useGeneratedStore = create<GeneratedState>((set) => ({
loading:false,
images: [],
error: null,

generateImage: async (values: z.infer<typeof ImageGeneratorFormSchema>) =>{
    console.log("generateImage function called with values:", values);
    set({loading:true, error:null})  

    const toastId = toast.loading("generating image...")


    console.log("this happens")

    try{
      const {error, success, data} =  await generateImageAction(values)
      if(!success){
        set({loading:false, error:error})
        return;
      }

      console.log('this is data', data)

      // Ensure data is an array of strings before mapping
      const urls: string[] = Array.isArray(data) ? data as string[] : [];
      const dataWithUrl = urls.map((url: string) => {
        return { 
          url, 
          ...values 
        }
      })

      console.log("data with url", dataWithUrl)

      set({ images: dataWithUrl, loading: false })
      toast.success("Image generated successfully!", {id: toastId})


      await storeImages(dataWithUrl)
      toast.success("Image stored successfully!", {id: toastId})


    }catch(error:any){
        console.error(error)
        set({
          loading:false, 
          error:"failed to generate, image please try again"})
    }
}

}))

export default useGeneratedStore
