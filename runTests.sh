export DIR=`pwd`;

echo '---------------------------------------';
echo 'RUNNING JASMINE SPECS FROM APP DIRECTORY';
echo '---------------------------------------';

cd "$DIR/app";
jasmine 

echo '---------------------------------------';
echo 'RUNNING JASMINE SPECS FROM MONGO DIRECTORY';
echo '---------------------------------------';

cd "$DIR/mongo";
jasmine

echo '---------------------------------------';
echo 'RUNNING JASMINE SPECS FROM BCRYPT DIRECTORY';
echo '---------------------------------------';

cd "$DIR/bcrypt";
jasmine

echo '---------------------------------------';
echo 'RUNNING JASMINE SPECS FROM ROOT DIRECTORY';
echo '---------------------------------------';

cd "$DIR/";
jasmine