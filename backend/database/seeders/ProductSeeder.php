<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['name'=>'Oud Royal','name_ar'=>'عود ملكي','slug'=>'oud-royal','description'=>'An exceptional composition of rare Cambodian oud, dark rose and aged sandalwood.','description_ar'=>'تركيبة استثنائية من العود الكمبودي النادر والورد الداكن وخشب الصندل المعتق.','price'=>349,'images'=>['https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?w=800&h=800&fit=crop'],'category'=>'oud','notes'=>['Cambodian Oud','Dark Rose','Sandalwood','Amber'],'stock'=>50,'rating'=>5.0,'num_reviews'=>456,'is_bestseller'=>true,'is_featured'=>true,'size'=>'50ml','year'=>'2025'],
            ['name'=>'Amber Nights','name_ar'=>'ليالي العنبر','slug'=>'amber-nights','description'=>'A warm, sensual amber fragrance with notes of saffron, vanilla and soft musk.','description_ar'=>'عطر عنبري دافئ وحسي بنوتات الزعفران والفانيليا والمسك الناعم.','price'=>299,'images'=>['https://images.unsplash.com/photo-1765031117402-93b2e530edec?w=800&h=800&fit=crop'],'category'=>'amber','notes'=>['Saffron','Amber','Vanilla','White Musk'],'stock'=>35,'rating'=>4.9,'num_reviews'=>234,'is_new'=>true,'is_featured'=>true,'size'=>'50ml','year'=>'2024'],
            ['name'=>'Rose Mystique','name_ar'=>'الوردة الغامضة','slug'=>'rose-mystique','description'=>'The finest Taif roses blended with Bulgarian rose absolute, patchouli and a touch of oud.','description_ar'=>'أجود ورود الطائف ممزوجة مع روح الورد البلغاري والباتشولي ولمسة من العود.','price'=>279,'images'=>['https://images.unsplash.com/photo-1545936761-c64b78657cb1?w=800&h=800&fit=crop'],'category'=>'rose','notes'=>['Taif Rose','Bulgarian Rose','Patchouli','Oud'],'stock'=>40,'rating'=>4.8,'num_reviews'=>189,'is_featured'=>true,'size'=>'50ml','year'=>'2024'],
            ['name'=>'Musk Noir','name_ar'=>'المسك الأسود','slug'=>'musk-noir','description'=>'Deep, mysterious and magnetic. A dark musk with vetiver, black pepper and jasmine.','description_ar'=>'عميق وغامض وجذاب. مسك داكن مع الفيتيفر والفلفل الأسود وهمسة من الياسمين.','price'=>319,'images'=>['https://images.unsplash.com/photo-1729101807924-3446ca9aa480?w=800&h=800&fit=crop'],'category'=>'musk','notes'=>['Dark Musk','Vetiver','Black Pepper','Jasmine'],'stock'=>45,'rating'=>4.7,'num_reviews'=>321,'is_bestseller'=>true,'size'=>'50ml','year'=>'2024'],
            ['name'=>'Jasmine Étoile','name_ar'=>'ياسمين النجوم','slug'=>'jasmine-etoile','description'=>'Hand-picked Grasse jasmine at its absolute peak, kissed with bergamot and warm sandalwood.','description_ar'=>'ياسمين غراس مقطوف يدوياً في ذروته المطلقة مع البرغموت والأرز الأبيض.','price'=>259,'images'=>['https://images.unsplash.com/photo-1595255944594-615b28fef523?w=800&h=800&fit=crop'],'category'=>'jasmine','notes'=>['Grasse Jasmine','Bergamot','White Cedar','Sandalwood'],'stock'=>30,'rating'=>4.6,'num_reviews'=>142,'is_new'=>true,'size'=>'50ml','year'=>'2025'],
            ['name'=>'Sandalwood Empire','name_ar'=>'إمبراطورية الصندل','slug'=>'sandalwood-empire','description'=>'Mysore sandalwood at its most majestic, layered with cardamom, leather and smoky incense.','description_ar'=>'خشب الصندل الميسوري في أروع حالاته مع الهيل والجلد وأثر من البخور الدخاني.','price'=>329,'images'=>['https://images.unsplash.com/photo-1615309258975-226d9be6a8c6?w=800&h=800&fit=crop'],'category'=>'sandalwood','notes'=>['Mysore Sandalwood','Cardamom','Leather','Incense'],'stock'=>25,'rating'=>4.8,'num_reviews'=>98,'size'=>'50ml','year'=>'2025'],
        ];

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
