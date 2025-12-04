import { Award, Plus } from "lucide-react";


type ProfileCertificationsSectionProps = {
    id: number;
    name: string;
    issuer: string;
    year: string;
}

export const ProfileCertificationsSection = ({
    id,
    name,
    issuer,
    year,
}: ProfileCertificationsSectionProps) => {
    return (
        <>
         
          
              <div
                key={id}
                className="flex items-start gap-4 p-4 bg-linear-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-100 hover:shadow-md transition-all"
              >
                <div className="p-2 bg-white rounded-lg">
                  <Award className="text-amber-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {issuer} • {year}
                  </p>
                </div>
              </div>
        


          {/* <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
            <Plus size={18} />
            <span>Add Certification</span>
          </button> */}
        </>
    );
};