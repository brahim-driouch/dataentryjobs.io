import { Plus } from "lucide-react";

type ProfileEducationSectionProps = {
    id: number;
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    description: string;
}


export const ProfileEducationSection = ({
    id,
    degree,
    school,
    startDate,
    endDate,
    description,
}: ProfileEducationSectionProps) => {
    return (
       <div className="space-y-6">
          
              <div
                key={id}
                className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {degree}
                    </h3>
                    <p className="text-gray-700 font-medium mt-1">
                      {school}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg">
                    {startDate} - {endDate}
                  </span>
                </div>
                <p className="text-gray-600 mt-3">{description}</p>


            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
              <Plus size={18} />
              <span>Add Education</span>
            </button>
          </div>
          </div>
    );
    
};