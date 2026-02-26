import ProductForm from "@/app/components/productForm";

export default async function NewProduct({params}){
    return (
        <div>
            <ProductForm value="New"/>
        </div>
    )
}