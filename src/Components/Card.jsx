import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import Rating from './Rating'
   
  export function Cards({coursedata}) {
    return (
      <Card className="w-auto mx-1 my-2">
        <CardHeader shadow={false} floated={false} className="h-44">
          <img
            src={coursedata?.banner}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="text-gray-500 ">
              By {coursedata?.tutor.firstName+' '+coursedata?.tutor.lastName}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
             <Rating/>
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="text-lg font-poppins"
          >
            {coursedata?.title}
          </Typography>
          <h2 className="text-sm font-poppins text-slate-500 ">
              In {coursedata?.category?.category}
          </h2>
        </CardBody>
        <div className="w-full flex justify-center">
            <hr className="w-5/6" />
        </div>
        <CardFooter className="pt-0 flex justify-between items-center">
            <h1>0000</h1>
          <Button
            ripple={false}
            fullWidth={true}
            className="text-right underline text-blue-800 bg-blue-gray-900/10  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
           View Details {">>"}
          </Button>
        </CardFooter>
      </Card>
    );
  }